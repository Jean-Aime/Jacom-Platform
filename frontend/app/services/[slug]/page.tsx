import { dataFetcher } from "@/lib/data-fetcher";
import { notFound } from "next/navigation";
import MegaMenuHeader from "@/components/Header/MegaMenuHeader";
import Footer from "@/components/Footer/Footer";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const CapIcon = ({ type }: { type: string }) => {
  const icons: Record<string, JSX.Element> = {
    integration: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    predictive: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    robotics: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    twins: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  };
  return icons[type] ?? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
};

/**
 * Per-slug hero images — curated to visually explain the service
 * and where possible to show African business / landscape context.
 * Priority at runtime: service.image (DB) → slugHeroImages[slug] → DEFAULT_HERO
 */
const DEFAULT_HERO =
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

const slugHeroImages: Record<string, string> = {
  /* ── Digital & Technology ─────────────────────────────── */
  "digital-transformation":
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  // African tech professionals collaborating in a modern workspace

  "iot-platform":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  // IoT circuit board / embedded tech hardware close-up

  "web-development-training":
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
  // Code glowing on a developer's screen

  /* ── Industrial & Infrastructure ─────────────────────── */
  "smart-factory":
    "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  // Automated manufacturing floor with robotic arms

  "smart-building":
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  // Contemporary glass-facade high-rise building at dusk

  "renewable-energy":
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
  // Vast solar-panel field under a bright African sky

  /* ── People, Training & Advisory ─────────────────────── */
  "recruitment-training":
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  // Professional workshop / classroom training session

  "financial-advisory":
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  // Financial analyst reviewing charts at a desk

  "budget-investment":
    "https://images.unsplash.com/photo-1559526324-593bc073d938?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  // Growth graphs and investment portfolio planning

  "pmo-services":
    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2076&q=80",
  // Project planning board with sticky notes and roadmap
};

function getHeroImage(dbImage: string | null | undefined, slug: string): string {
  return dbImage || slugHeroImages[slug] || DEFAULT_HERO;
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await dataFetcher.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const subServices = service.subServices || [];
  const capabilities = service.serviceCapabilities || [];
  const processSteps = service.serviceProcessSteps || [];
  const metrics = service.serviceMetrics || [];
  const relatedInsights = (service as any).insights || [];

  const defaultMetrics = [
    { value: "100%", label: "Client satisfaction across all delivered projects" },
    { value: "50+", label: "Dedicated experts assigned to your engagement" },
    { value: "3+", label: "Years of specialized domain knowledge" },
  ];

  const displayMetrics = metrics.length > 0 ? metrics.slice(0, 3) : defaultMetrics;

  return (
    <div className="min-h-screen bg-white">
      <MegaMenuHeader />

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">
        {/* Background image — uses service.image if set, else a professional fallback */}
        <div className="absolute inset-0">
          <img
            src={getHeroImage(service.image, service.slug)}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
        </div>
        {/* Dark gradient overlay — keeps text legible over any image */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-gray-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-8" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <a href="/services" className="hover:text-white transition-colors">Services</a>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-red-400">{service.name}</span>
          </nav>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left: 3 cols */}
            <div className="lg:col-span-3">
              <div className="inline-flex items-center gap-2 bg-red-950/60 border border-red-800/40 text-red-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                {service.type ? service.type.charAt(0) + service.type.slice(1).toLowerCase() : "Consulting"} Service
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5 tracking-tight">
                {service.name}
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="/contact"
                  className="bg-primary hover:bg-red-700 text-white px-8 py-3.5 rounded-lg font-bold transition-all hover:scale-105 shadow-lg shadow-red-950/50 text-sm"
                >
                  Get Started Today
                </a>
                <a
                  href="#process"
                  className="border border-gray-700 hover:border-gray-400 text-gray-400 hover:text-white px-8 py-3.5 rounded-lg font-bold transition-all text-sm"
                >
                  See Our Process
                </a>
              </div>
            </div>

            {/* Right: stats glass card – 2 cols */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Service at a Glance</p>
                <div className="space-y-5 mb-6">
                  {displayMetrics.map((m: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 border-b border-white/5 pb-5 last:border-0 last:pb-0">
                      <span className="text-3xl font-bold text-white shrink-0">{m.value}</span>
                      <span className="text-sm text-gray-400 leading-snug">{m.label}</span>
                    </div>
                  ))}
                </div>
                {subServices.length > 0 && (
                  <div className="pt-5 border-t border-white/10">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Includes</p>
                    <div className="flex flex-wrap gap-2">
                      {subServices.slice(0, 5).map((sub: any, i: number) => (
                        <span key={i} className="text-xs bg-white/10 text-gray-300 px-3 py-1.5 rounded-full">
                          {typeof sub === "string" ? sub : sub.name}
                        </span>
                      ))}
                      {subServices.length > 5 && (
                        <span className="text-xs bg-primary/20 text-red-300 px-3 py-1.5 rounded-full">
                          +{subServices.length - 5} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ────────────────────────────────────────── */}
      {service.overview && (
        <section className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-3 gap-10 items-start">
              <div className="lg:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-0.5 bg-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Overview</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
                  What is {service.name}?
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6">
                  {service.overview}
                </p>
                {service.methodologies && (
                  <div className="flex flex-wrap gap-2">
                    {service.methodologies.split(",").map((m: string, i: number) => (
                      <span key={i} className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200">
                        {m.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Why choose panel */}
              <div className="bg-gray-50 border-l-4 border-primary rounded-r-2xl p-7">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Why Choose This Service</p>
                <ul className="space-y-3">
                  {[
                    "Strategies tailored to your specific business needs",
                    "Proven methodology with measurable outcomes",
                    "Cross-industry expertise and global perspective",
                    "End-to-end support from strategy to execution",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all"
                >
                  Discuss your project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SUB-SERVICES ────────────────────────────────────── */}
      {subServices.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-0.5 bg-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">What We Deliver</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Specialized Service Areas</h2>
              </div>
              <a href="/contact" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all shrink-0">
                Discuss your needs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subServices.map((sub: any, index: number) => (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-primary scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top rounded-r-sm" />
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-50 group-hover:bg-primary flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                      <span className="text-xs font-bold text-primary group-hover:text-white transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors text-base leading-snug mb-1">
                        {typeof sub === "string" ? sub : sub.name}
                      </h3>
                      {typeof sub === "object" && sub.description && (
                        <p className="text-sm text-gray-500 leading-relaxed">{sub.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CORE CAPABILITIES ───────────────────────────────── */}
      {capabilities.length > 0 && (
        <section id="capabilities" className="bg-white py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Core Capabilities</span>
                <div className="w-8 h-0.5 bg-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">What We Excel At</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                Deep technical expertise combined with strategic insight to transform your business operations at scale.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {capabilities.map((cap: any, index: number) => (
                <div
                  key={index}
                  className="group relative bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <div className="w-12 h-12 bg-red-50 group-hover:bg-primary rounded-xl flex items-center justify-center mb-4 text-primary group-hover:text-white transition-all duration-300">
                      <CapIcon type={cap.icon} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-base">{cap.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS / ROADMAP ───────────────────────────────── */}
      {processSteps.length > 0 && (
        <section id="process" className="bg-gray-950 py-16 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-xs font-bold text-red-400 uppercase tracking-widest">Our Process</span>
                <div className="w-8 h-0.5 bg-primary" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-3">Implementation Roadmap</h2>
              <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                A structured, proven methodology that delivers consistent results across every client engagement.
              </p>
            </div>

            <div className="relative">
              {/* Horizontal connector line (desktop only) */}
              <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent hidden lg:block" />

              <div className={`grid gap-8 ${
                processSteps.length <= 3
                  ? `md:grid-cols-${processSteps.length}`
                  : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              }`}>
                {processSteps.map((step: any, index: number) => (
                  <div key={index} className="relative text-center">
                    <div className="relative z-10 w-20 h-20 bg-gray-900 border-2 border-primary rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-red-950/40">
                      <span className="text-2xl font-bold text-white">{step.step ?? index + 1}</span>
                    </div>
                    <h3 className="font-bold text-white mb-2 text-base">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── METRICS STRIP ───────────────────────────────────── */}
      {metrics.length > 0 && (
        <section className="bg-primary py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 divide-x divide-red-700/40">
              {metrics.map((metric: any, index: number) => (
                <div key={index} className="text-center px-4 first:pl-0 last:pr-0">
                  <div className="text-4xl sm:text-5xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-red-200 text-xs font-semibold uppercase tracking-wider">{metric.label}</div>
                  {metric.change && (
                    <div className="mt-2 text-xs text-white/70">{metric.change}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA + CONSULTATION FORM ─────────────────────────── */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left: Value props */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Get Started</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed text-sm">
                Schedule a consultation with our {service.name} specialists. We analyze your specific situation and design a clear roadmap toward measurable results.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "Complimentary initial business assessment",
                  "Custom solution architecture and roadmap",
                  "Transparent ROI projections before you commit",
                  "Dedicated senior consultant assigned to you",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-50 border border-red-100 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-start gap-4 bg-white border border-gray-200 rounded-xl p-5">
                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Email Directly</p>
                  <a href="mailto:jacomeorg@gmail.com" className="text-base font-bold text-gray-900 hover:text-primary transition-colors">
                    jacomeorg@gmail.com
                  </a>
                  <p className="text-xs text-gray-400 mt-0.5">Response within 24 business hours</p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Schedule a Free Consultation</h3>
              <p className="text-sm text-gray-500 mb-6">30-minute discovery call with a senior specialist</p>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 text-gray-900 text-sm outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 text-gray-900 text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Work Email</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 text-gray-900 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Company</label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 text-gray-900 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Service of Interest</label>
                  <input
                    type="text"
                    value={service.name}
                    readOnly
                    className="w-full px-4 py-2.5 border border-red-100 rounded-lg bg-red-50 text-primary font-bold text-sm outline-none cursor-default"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Message (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your challenge or goals..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-gray-50 text-gray-900 text-sm outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-red-700 text-white py-3.5 rounded-lg font-bold transition-all hover:shadow-lg hover:shadow-red-200/50 text-sm tracking-wide"
                >
                  Schedule My Consultation →
                </button>

                <p className="text-xs text-gray-400 text-center">
                  No commitment required. We respect your privacy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED INSIGHTS ────────────────────────────────── */}
      {relatedInsights.length > 0 && (
        <section className="bg-white py-14 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-0.5 bg-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">Latest Thinking</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Related Insights</h2>
              </div>
              <a href="/insights" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all">
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedInsights.slice(0, 3).map((insight: any, index: number) => (
                <a
                  key={index}
                  href={`/insights/${insight.slug}`}
                  className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  {insight.image && (
                    <div className="h-44 overflow-hidden">
                      <img
                        src={insight.image}
                        alt={insight.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {insight.category && (
                      <span className="text-xs font-bold text-primary uppercase tracking-widest">{insight.category}</span>
                    )}
                    <h3 className="font-bold text-gray-900 mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2 text-base leading-snug">
                      {insight.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {insight.excerpt ?? insight.summary}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
