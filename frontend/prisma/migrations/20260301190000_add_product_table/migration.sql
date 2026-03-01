CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "stock" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'published',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "product_slug_key" ON "product"("slug");
CREATE INDEX "product_category_idx" ON "product"("category");
CREATE INDEX "product_status_idx" ON "product"("status");
CREATE INDEX "product_featured_idx" ON "product"("featured");
