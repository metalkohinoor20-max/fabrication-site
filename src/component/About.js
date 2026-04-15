"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ShieldCheck,
  Clock,
  BadgeIndianRupee,
  Sparkles,
  MapPin,
  Phone,
  CalendarDays,
  Wrench,
} from "lucide-react"
import { siteConfig } from "@/lib/config/site"

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
const WHATSAPP_MSG = encodeURIComponent(
  siteConfig.whatsappMsg
)
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

// ─── DATA (edit here freely) ──────────────────────────────────────────────────

const OWNER = {
  name: siteConfig.businessName,
  role: "Professional Aluminium Fabricator",
  experience: siteConfig.stats.experience,
  location: siteConfig.location,
  phone: siteConfig.phone,
  profileImage: "/about/profile.jpg",
  bio: `With over a decade of hands-on experience in the fabrication industry, I've built a reputation for delivering precision work that stands the test of time. From sleek ACP cladding on commercial facades to robust aluminium door and window installations for residences, every project gets my full attention — from measurement to final handover. I take pride in doing the job right the first time, keeping my clients informed, and never cutting corners on quality. Based in ${siteConfig.location}, I'm available for projects across ${siteConfig.location}.`,
}

const SERVICES_LIST = [
  "ACP Cladding & Elevation Work",
  "Aluminium Doors & Windows",
  "Glass Work & Partitions",
  "Louvers & Fascia Panels",
  "UPVC Windows & Doors",
  "Shop Front Fabrication",
]

const STATS = [
  { value: siteConfig.stats.experience, label: "Years of Experience", icon: CalendarDays },
  { value: siteConfig.stats.projects, label: "Projects Completed", icon: Wrench },
  { value: siteConfig.stats.satisfaction, label: "Client Satisfaction", icon: ShieldCheck },
  { value: siteConfig.stats.citiesServed, label: "Cities Served", icon: MapPin },
]

const USPS = [
  {
    icon: ShieldCheck,
    title: "High Quality Work",
    desc: "We use ISI-certified materials and proven techniques. Every joint, weld, and finish is inspected before handover.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "Timelines are commitments, not estimates. We plan projects carefully and keep you updated at every step.",
  },
  {
    icon: BadgeIndianRupee,
    title: "Transparent Pricing",
    desc: "You get a detailed, itemized quote upfront. No surprise additions, no hidden charges — ever.",
  },
  {
    icon: Sparkles,
    title: "Professional Finish",
    desc: "Clean cuts, tight seals, perfect alignments. The finishing touch is what separates good work from great work.",
  },
]

const WORK_IMAGES = [
  { src: "/about/work1.jpg", alt: "ACP cladding work on commercial building" },
  { src: "/about/work2.jpg", alt: "Aluminium window installation project" },
  { src: "/about/work3.jpg", alt: "Glass partition work for corporate office" },
]

// ─── SUBCOMPONENTS ────────────────────────────────────────────────────────────

/** Reusable section heading */
const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-12">
    {eyebrow && (
      <p className="mb-2 text-sm font-medium text-green-600">{eyebrow}</p>
    )}
    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
    {subtitle && (
      <p className="mx-auto mt-3 max-w-xl text-gray-600 text-sm leading-relaxed">
        {subtitle}
      </p>
    )}
  </div>
)

/** Single USP card */
const UspCard = ({ icon: Icon, title, desc }) => (
  <div className="group flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-400/40 hover:shadow-lg hover:shadow-green-500/5">
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600 transition group-hover:bg-green-500 group-hover:text-white">
      <Icon size={22} strokeWidth={1.8} />
    </div>
    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
    <p className="text-sm leading-relaxed text-gray-600">{desc}</p>
  </div>
)

/** Single stat item */
const StatItem = ({ value, label, icon: Icon }) => (
  <div className="flex flex-col items-center gap-2 text-center">
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-600">
      <Icon size={24} strokeWidth={1.6} />
    </div>
    <p className="text-3xl font-bold text-green-600">{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
)

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

const About = () => {
  return (
    <main className="mt-15">

      {/* ── 1. HERO ── */}
      <section className="relative overflow-hidden bg-gray-900 pt-32 pb-20 text-center text-white">
        {/* Subtle dot texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-2xl px-4">
          <span className="inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-green-400">
            About Us
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
            {siteConfig.stats.experience} of Crafting
            <span className="block text-green-400">Precision Fabrication</span>
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-400">
            A trusted name in aluminium, ACP and glass fabrication across {siteConfig.location} — built on quality, honesty and experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 active:scale-95"
            >
              <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
               Get Free Quote
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/10"
            >
              View Our Work →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. ABOUT CONTENT ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="grid items-center gap-14 lg:grid-cols-2">

            {/* Profile image */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative overflow-hidden rounded-3xl shadow-xl w-full max-w-md aspect-[4/5] bg-gray-100">
                <Image
                  src="/about/profile.png"
                  alt={`${OWNER.name} - ${OWNER.role}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 90vw, 400px"
                />
                {/* Floating badge */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-black/60 backdrop-blur-md px-4 py-3">
                  <p className="text-sm font-bold text-white">{OWNER.name}</p>
                  <p className="text-xs text-green-400">{OWNER.role}</p>
                </div>
              </div>
              {/* Decorative green blob */}
              <div
                className="pointer-events-none absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-green-400/15 blur-3xl"
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div>
              <span className="inline-block rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-semibold text-green-600 mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Meet <span className="text-green-500">{OWNER.name}</span> — Your Fabrication Expert
              </h2>
              <p className="mt-5 text-gray-600 leading-relaxed text-[15px]">
                {OWNER.bio}
              </p>

              {/* Quick info row */}
              <div className="mt-7 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <CalendarDays size={16} className="text-green-500 shrink-0" />
                  <span><strong>{OWNER.experience}</strong> Experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <MapPin size={16} className="text-green-500 shrink-0" />
                  <span>{OWNER.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Phone size={16} className="text-green-500 shrink-0" />
                  <Link href={`tel:${OWNER.phone}`} className="hover:text-green-600 transition">
                    {OWNER.phone}
                  </Link>
                </div>
              </div>

              {/* Services list */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  What We Do
                </p>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SERVICES_LIST.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" aria-hidden="true" />
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 active:scale-95"
                >
                   <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " /> Chat on WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. STATS ── */}
      <section className="border-y border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {STATS.map((stat) => (
              <StatItem key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WORK IMAGES ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-screen-xl px-4">
          <SectionHeading
            eyebrow="Our Work"
            title="Projects We're Proud Of"
            subtitle="A glimpse into the quality and precision we bring to every project, big or small."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WORK_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gray-200 bg-gray-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:bg-gray-100"
            >
              View all Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. USPs ── */}
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="mx-auto max-w-screen-xl px-4">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="What Sets Us Apart"
            subtitle="We don't just fabricate — we take ownership of every project and deliver results you'll be proud to show off."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {USPS.map((usp) => (
              <UspCard key={usp.title} {...usp} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <p className="mb-3 text-sm font-medium text-green-100">
            10 Years of Experience • Delhi-NCR
          </p>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Have a Project in Mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-green-100 leading-relaxed">
            Let&apos;s talk. Share your requirements on WhatsApp and we&apos;ll respond with a free detailed quote within 1 hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick("Floating WhatsApp Button - About")}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-xl transition hover:bg-green-50 active:scale-95"
            >
              <Image src="/whatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
              Get Quote on WhatsApp
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Contact Form →
            </Link>
          </div>
          <p className="mt-6 text-sm text-green-100 opacity-80">
            ✅ Free site visit &nbsp;•&nbsp; ✅ Detailed quotation &nbsp;•&nbsp; ✅ No hidden charges
          </p>
        </div>
      </section>

    </main>
  )
}

export default About