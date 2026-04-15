"use client"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { CheckCircle, ChevronDown, ChevronUp } from "lucide-react"
import { siteConfig } from "@/lib/config/site"
import { Suspense } from "react"

// ─── TRACKING HELPER ──────────────────────────────────────────────────────────
const trackButtonClick = (buttonName, metadata = {}) => {
  // ✅ Pixel tracking only (no CAPI - button clicks have no customer data)
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact", {
      content_name: buttonName,
      contact_method: "whatsapp",
      ...metadata,
    });
  }
  console.log(`📍 Button tracked: ${buttonName}`, metadata);
};

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = siteConfig.whatsapp.replace(/^\+/, '')
const WHATSAPP_MSG    = encodeURIComponent(
  siteConfig.whatsappMsg
)
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

// ─── HERO DATA ────────────────────────────────────────────────────────────────

const HERO = {
  badge:    "Aluminium • ACP • Glass • UPVC • Partition",
  heading:  "Complete Fabrication Services",
  subtext:  `Professional installation across Delhi, Noida & Gurgaon. ${siteConfig.stats.experience} of experience, ${siteConfig.stats.projects} projects delivered.`,
}

// ─── SERVICES DATA ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id:    "aluminium-work",
    icon:  "🪟",
    title: "Aluminium Work",
    tagline: "Lightweight. Rust-proof. Built to last.",
    desc:
      "We design and install premium aluminium doors, windows, sliding systems, curtain walls and structural glazing for residential and commercial projects. Aluminium is the most popular choice for modern buildings — low maintenance, highly durable, and available in a range of powder-coated finishes.",
    img:  "/services/Aluminium_Work.png",
    features: [
      "Aluminium Doors & Windows",
      "Sliding & Folding Systems",
      "Curtain Wall Glazing",
      "Powder Coated Finishes",
      "Thermal Break Profiles",
      "Mosquito Net Integration",
    ],
    benefits: [
      { icon: "🛡️", title: "Rust-Free",       desc: "Aluminium never rusts — ideal for humid or coastal environments." },
      { icon: "⚡", title: "Lightweight",      desc: "Easy to install and operate without heavy hardware." },
      { icon: "🎨", title: "Custom Finishes",  desc: "Available in 100+ RAL colors and wood-finish laminates." },
      { icon: "🔧", title: "Low Maintenance",  desc: "Wipe clean, no painting required, zero upkeep cost." },
    ],
    faqs: [
      { q: "How long does aluminium work installation take?",   a: "Typical residential jobs take 5–10 days depending on scope. Commercial projects are planned in phases." },
      { q: "Can existing frames be replaced with aluminium?",    a: "Yes, we do retrofitting work — old frames removed and new aluminium profiles installed cleanly." },
      { q: "What warranty do you provide on aluminium work?",    a: "We provide 10+ years warranty on aluminium fabrication and installation workmanship." },
    ],
  },
  {
    id:    "acp-work",
    icon:  "🧩",
    title: "ACP Work",
    tagline: "Modern facades that make your property stand out.",
    desc:
      "ACP (Aluminium Composite Panel) cladding transforms ordinary building exteriors into sleek, modern facades. We handle complete ACP elevation work for shops, showrooms, hospitals, malls and commercial buildings. Our work includes sub-frame fabrication, panel cutting, and professional installation for long-lasting results.",
    img:  "/services/ACP_Work.png",
    features: [
      "Shop Front Elevation",
      "Commercial Cladding",
      "Louver Panels",
      "Signage Backdrops",
      "ACP Column Cladding",
      "Rooftop ACP Fascia",
    ],
    benefits: [
      { icon: "🏢", title: "Premium Look",      desc: "Gives any property a high-end, professional appearance." },
      { icon: "🌧️", title: "Weather Resistant", desc: "ACP panels are fully weatherproof and UV resistant." },
      { icon: "🎨", title: "Endless Designs",   desc: "Available in solid colors, metallic, wood & stone finishes." },
      { icon: "⚡", title: "Fast Installation", desc: "Lightweight panels mean faster project completion." },
    ],
    faqs: [
      { q: "What thickness of ACP panels do you use?",         a: "We use 4mm ACP with 3mm aluminium skin for standard work, and thicker panels for heavy-duty projects." },
      { q: "Can ACP be used for interior work too?",            a: "Yes — ACP works beautifully for reception walls, cabins, and interior feature walls." },
      { q: "How do you handle curved surfaces?",                a: "We use routing and bending techniques to create seamless curves and complex shapes." },
      { q: "What warranty do you provide on ACP work?",         a: "We provide 10+ years warranty on ACP cladding and installation workmanship." },
    ],
  },
  {
    id:    "glass-work",
    icon:  "🔲",
    title: "Glass Work",
    tagline: "Toughened glass solutions for every space.",
    desc:
      "We provide complete toughened and tempered glass solutions — from office cabin partitions to stylish shower enclosures, glass staircases, frameless doors, glass facades and balcony railings. All glass used is ISI-certified toughened glass that is 5x stronger than ordinary glass for safety and durability.",
    img:  "/services/Glass_Work.png",
    features: [
      "Toughened Glass Doors",
      "Office Glass Cabins",
      "Shower Enclosures",
      "Glass Balcony Railings",
      "Spider Glazing / Frameless",
      "Mirror Work",
    ],
    benefits: [
      { icon: "🛡️", title: "5x Stronger",     desc: "Toughened glass is safety-tested and ISI certified." },
      { icon: "✨", title: "Elegant Aesthetic", desc: "Glass spaces look open, bright and premium." },
      { icon: "🔆", title: "More Natural Light", desc: "Glass maximizes natural light reducing electricity costs." },
      { icon: "📐", title: "Custom Sizes",     desc: "Cut to any dimension — no standard sizing limitations." },
    ],
    faqs: [
      { q: "Is toughened glass safe for homes?",               a: "Yes — toughened glass is the safest glass option. If broken, it shatters into small blunt pieces." },
      { q: "Can you do frameless glass doors?",                 a: "Yes, we specialize in frameless and semi-frameless glass door systems with patch fittings." },
      { q: "What thickness glass do you recommend for cabins?", a: "10mm–12mm toughened glass for office cabins and partition walls." },
      { q: "What warranty do you provide on glass work?",       a: "We provide 5+ years warranty on glass work and installation workmanship." },
    ],
  },
  {
    id:    "partition-work",
    icon:  "🧱",
    title: "Partition Work",
    tagline: "Smart space division for homes and offices.",
    desc:
      "Need to divide a large space without breaking walls? We create sleek, modern partition systems using aluminium frames, glass panels, or gypsum board. Perfect for office cabins, conference rooms, home study rooms, or shop divisions. Partitions can be permanent or demountable as per your needs.",
    img:  "/services/Partition_Work.png",
    features: [
      "Glass & Aluminium Partitions",
      "Gypsum Board Partitions",
      "Office Cabin Partitions",
      "False Ceiling Integration",
      "Acoustic Partitions",
      "Demountable Partitions",
    ],
    benefits: [
      { icon: "🏗️", title: "No Wall Breaking", desc: "Space divided without major civil work — clean and fast." },
      { icon: "🔇", title: "Sound Dampening",  desc: "Acoustic partitions reduce noise between spaces effectively." },
      { icon: "🎨", title: "Customizable",     desc: "Any size, height, and finish to match your interior." },
      { icon: "🔄", title: "Demountable",      desc: "Can be relocated or removed without damage." },
    ],
    faqs: [
      { q: "How long does a partition take to install?",         a: "A standard office partition of 100 sq.ft takes 3–5 days." },
      { q: "Can partitions be floor-to-ceiling?",                a: "Yes — we do both partial height and full floor-to-ceiling partitions." },
      { q: "Do partitions require civil permission?",             a: "Generally no — partition work is considered interior fit-out, not structural." },
      { q: "What warranty do you provide on partition work?",    a: "We provide 10+ years warranty on partition work and installation workmanship." },
    ],
  },
  {
    id:    "upvc-work",
    icon:  "🚪",
    title: "UPVC Work",
    tagline: "Soundproof. Waterproof. Zero maintenance.",
    desc:
      "UPVC (Unplasticized Polyvinyl Chloride) windows and doors are the premium choice for noise reduction and thermal insulation. Ideal for homes near highways, airports, or noisy areas. UPVC never needs painting, doesn't rust or rot, and has a lifespan of 30+ years. A long-term investment for your home.",
    img:  "/services/UPVC_Work.png",
    features: [
      "UPVC Casement Windows",
      "UPVC Sliding Windows",
      "UPVC Doors",
      "Double / Triple Glazing",
      "Fly Screen Integration",
      "Child Safety Locks",
    ],
    benefits: [
      { icon: "🔇", title: "Soundproof",       desc: "Reduces external noise by up to 70% with double glazing." },
      
      { icon: "🔧", title: "Zero Maintenance",  desc: "No painting, no rust, no rot — ever. Just wipe clean." },
      { icon: "🔒", title: "More Secure",       desc: "Multi-point locking systems for enhanced home security." },
    ],
    faqs: [
      { q: "Is UPVC better than aluminium for windows?",         a: "UPVC is better for sound insulation and thermal performance. Aluminium is better for strength and slim profiles." },
      { q: "How long do UPVC windows last?",                     a: "Quality UPVC windows last 25–30+ years with no maintenance required." },
      { q: "Do UPVC windows come with mosquito nets?",            a: "Yes — we integrate fly screens and mosquito meshes in our UPVC window frames." },
  
    ],
  },
]

// ─── WHY CHOOSE US DATA ───────────────────────────────────────────────────────

const WHY_US = [
  { icon: "🏆", title: `${siteConfig.stats.experience} Experience`,     desc: "A decade of professional fabrication work across Delhi-NCR." },
  { icon: "✅", title: `${siteConfig.stats.projects} Projects Delivered`,   desc: "Residential, commercial and industrial projects of all sizes." },
  { icon: "🔧", title: "In-house Installation",     desc: "Our own skilled team — no subcontracting, full quality control." },
  { icon: "💬", title: "1-Hour Quote Response",     desc: "Send requirements on WhatsApp and get a quote within the hour." },
  { icon: "📋", title: "Transparent Pricing",       desc: "No hidden charges. Clear breakdowns before work begins." },
  { icon: "🛡️", title: `${siteConfig.stats.Warranty} Warranty`,           desc: "All workmanship covered under our quality guarantee." },
]

// ─── PROCESS DATA ─────────────────────────────────────────────────────────────

const PROCESS = [
  { step: "01", title: "Enquiry",        desc: "Share your requirements via WhatsApp or call. We respond within 1 hour." },
  { step: "02", title: "Site Visit",     desc: "Our team visits your site for measurements and technical assessment." },
  { step: "03", title: "Quotation",      desc: "We provide a detailed, itemized quote with material and labour breakdown." },
  { step: "04", title: "Work Begins",    desc: "On approval, fabrication starts at our workshop and site work is scheduled." },
  { step: "05", title: "Installation",   desc: "Professional on-site installation by our experienced team." },
  { step: "06", title: "Handover",       desc: "Final inspection, cleaning, and handover with warranty documentation." },
]

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="w-full flex items-center justify-between p-4 text-left text-sm font-medium text-gray-800 hover:bg-gray-50 transition pointer-events-auto"
      >
        {q}
        {open ? <ChevronUp size={16} className="text-green-600 shrink-0 ml-3" /> : <ChevronDown size={16} className="text-gray-400 shrink-0 ml-3" />}
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
          {a}
        </div>
      )}
    </div>
  )
}

const ServiceSection = ({ service, index }) => {
  const isReversed = index % 2 !== 0
  return (
    <section
      id={service.id}
      className="py-20 border-b border-gray-100 scroll-mt-20"
    >
      <div className="mx-auto max-w-screen-xl px-4">

        {/* Top: Image + Main Info */}
        <div className={`grid gap-12 items-center md:grid-cols-2 ${isReversed ? 'md:[&>*:first-child]:order-last' : ''}`}>

          {/* Image */}
          <div className="relative overflow-hidden rounded-2xl shadow-lg group">
            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src={service.img}
                alt={service.title}
                width={700}
                height={525}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
            </div>
            {/* Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
              <span className="text-lg">{service.icon}</span>
              <span className="text-xs font-semibold text-gray-800">{service.title}</span>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="inline-block text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1 mb-3">
              {service.tagline}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              {service.title}
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {service.desc}
            </p>

            {/* Features Grid */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {service.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={14} className="text-green-500 shrink-0" />
                  {f}
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick("Get Free Quote Button - Services Card", { service_id: id })}
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-600 transition active:scale-95"
              >
                <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
                Get Free Quote
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition"
              >
                View Our Work →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: Benefits + FAQs */}
        <div className="mt-14 grid gap-10 md:grid-cols-2">

          {/* Benefits */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Why Choose Our {service.title}?</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {service.benefits.map((b) => (
                <div key={b.title} className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 hover:border-green-300 hover:bg-green-50/30 transition">
                  <span className="text-2xl mt-0.5 shrink-0">{b.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Frequently Asked Questions</h3>
            <div className="flex flex-col gap-2">
              {service.faqs.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const ServicesPage = () => {
  const searchParams = useSearchParams()
  const section = searchParams.get("section")

  useEffect(() => {
    if (section) {
      const el = document.getElementById(section)
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100)
      }
    }
  }, [section])

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gray-900 pt-32 pb-16 text-white text-center">
        <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-5 tracking-wide">
          {HERO.badge}
        </span>
        <h1 className="text-4xl font-bold sm:text-5xl max-w-3xl mx-auto leading-tight">
          {HERO.heading}
        </h1>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base leading-relaxed">
          {HERO.subtext}
        </p>
        {/* Service Quick Jump */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-4 py-1.5 text-sm text-white hover:bg-white/20 transition"
            >
              <span>{s.icon}</span> {s.title}
            </a>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-green-600 mb-1">Why {siteConfig.businessName} ?</p>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Trusted by {siteConfig.stats.clients} Clients</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {WHY_US.map((item) => (
              <div key={item.title} className="text-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-green-300 hover:bg-green-50/40 transition">
                <div className="text-3xl mb-2">{item.icon}</div>
                <p className="text-xs font-semibold text-gray-900 leading-snug">{item.title}</p>
                <p className="text-[11px] text-gray-500 mt-1 leading-relaxed hidden sm:block">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SECTIONS ── */}
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* ── OUR PROCESS ── */}
      <section className="bg-gray-50 py-20 border-b border-gray-100">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-medium text-green-600 mb-1">How We Work</p>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our Simple Process</h2>
            <p className="mt-2 text-gray-600 max-w-lg mx-auto text-sm">From enquiry to handover — a smooth, professional experience every time.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {PROCESS.map((step, i) => (
              <div key={step.step} className="relative flex flex-col items-center text-center p-5 rounded-2xl bg-white border border-gray-200 hover:border-green-300 hover:shadow-sm transition">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold mb-3">
                  {step.step}
                </div>
                {/* Connector line (desktop) */}
                {i < PROCESS.length - 1 && (
                  <div className="hidden xl:block absolute top-10 left-[calc(100%+1px)] w-[calc(var(--gap,24px)+2px)] h-px bg-green-200 z-10" />
                )}
                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Need Help Choosing the Right Service?</h2>
          <p className="mt-3 text-green-100 max-w-xl mx-auto">
            Share your requirements on WhatsApp and our team will guide you to the best solution for your project and budget.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("Chat on WhatsApp Button - Services CTA")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-xl hover:bg-green-50 transition active:scale-95"
            >
          <Image src="/whatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
              Chat on WhatsApp
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              View Our Work →
            </Link>
          </div>
          <p className="mt-6 text-sm text-green-100 opacity-80">
            ✅ Free site visit &nbsp;•&nbsp; ✅ Detailed quotation &nbsp;•&nbsp; ✅ No hidden charges
          </p>
        </div>
      </section>
    </>
  )
}

const Services = () => {
  return(
<Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">Loading services...</p></div>}>
  <ServicesPage />
</Suspense>
  )
  
}


export default Services