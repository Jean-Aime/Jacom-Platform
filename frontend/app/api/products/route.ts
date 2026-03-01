import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { validateSession, unauthorizedResponse } from "@/lib/auth-middleware";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function ensureUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  const safeBase = baseSlug || "product";
  let candidate = safeBase;
  let suffix = 1;

  while (true) {
    const existing = await prisma.product.findFirst({
      where: excludeId
        ? {
            slug: candidate,
            NOT: { id: excludeId }
          }
        : { slug: candidate },
      select: { id: true }
    });

    if (!existing) return candidate;
    candidate = `${safeBase}-${suffix++}`;
  }
}

function toBoolean(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    if (value === "true") return true;
    if (value === "false") return false;
  }
  return fallback;
}

function normalizePrice(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function normalizeInteger(value: unknown): number | null {
  if (typeof value === "number" && Number.isInteger(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isInteger(parsed)) return parsed;
  }
  return null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const q = searchParams.get("q");
    const takeRaw = Number(searchParams.get("take") || "24");
    const take = Number.isFinite(takeRaw) ? Math.min(Math.max(takeRaw, 1), 100) : 24;

    const where: Prisma.ProductWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.category = { equals: category, mode: "insensitive" };
    }

    if (featured === "true") {
      where.featured = true;
    } else if (featured === "false") {
      where.featured = false;
    }

    if (q && q.trim().length > 1) {
      const query = q.trim();
      where.OR = [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
        { category: { contains: query, mode: "insensitive" } }
      ];
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
      take
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const category = typeof body.category === "string" ? body.category.trim() : "";
    const price = normalizePrice(body.price);

    if (!name || !category || price === null) {
      return NextResponse.json(
        { error: "name, category and price are required" },
        { status: 400 }
      );
    }

    const baseSlug = slugify(typeof body.slug === "string" && body.slug ? body.slug : name);
    const slug = await ensureUniqueSlug(baseSlug);

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: typeof body.description === "string" ? body.description : null,
        category,
        price,
        image: typeof body.image === "string" ? body.image : null,
        featured: toBoolean(body.featured, false),
        inStock: toBoolean(body.inStock, true),
        stock: normalizeInteger(body.stock),
        status: typeof body.status === "string" ? body.status : "published",
        sortOrder: normalizeInteger(body.sortOrder) ?? 0
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const idFromQuery = searchParams.get("id");
    const body = await request.json();
    const id = idFromQuery || body.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const name =
      typeof body.name === "string" && body.name.trim() ? body.name.trim() : existing.name;
    const nextSlugBase = slugify(
      typeof body.slug === "string" && body.slug.trim() ? body.slug : name
    );
    const slug =
      nextSlugBase === existing.slug
        ? existing.slug
        : await ensureUniqueSlug(nextSlugBase, existing.id);

    const price =
      body.price === undefined ? existing.price : normalizePrice(body.price);
    if (price === null) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description:
          typeof body.description === "string"
            ? body.description
            : body.description === null
            ? null
            : existing.description,
        category:
          typeof body.category === "string" && body.category.trim()
            ? body.category.trim()
            : existing.category,
        price,
        image:
          typeof body.image === "string"
            ? body.image
            : body.image === null
            ? null
            : existing.image,
        featured:
          body.featured === undefined ? existing.featured : toBoolean(body.featured, false),
        inStock:
          body.inStock === undefined ? existing.inStock : toBoolean(body.inStock, true),
        stock:
          body.stock === null
            ? null
            : body.stock === undefined
            ? existing.stock
            : normalizeInteger(body.stock) ?? existing.stock,
        status:
          typeof body.status === "string" && body.status.trim()
            ? body.status.trim()
            : existing.status,
        sortOrder:
          body.sortOrder === undefined
            ? existing.sortOrder
            : normalizeInteger(body.sortOrder) ?? existing.sortOrder
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await validateSession(request);
  if (!user) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
