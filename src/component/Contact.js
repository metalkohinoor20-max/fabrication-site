"use client"
import React, { useState } from "react"
import Link from "next/link"
import { siteConfig } from "@/lib/config/site"
import Image from "next/image"
// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = siteConfig.whatsapp.replace(/^\+/, '')
const PHONE_DISPLAY   = siteConfig.phone
const EMAIL           = siteConfig.email
const ADDRESS_LINE1   = siteConfig.location
const ADDRESS_LINE2   = siteConfig.addressLine2

const WHATSAPP_MSG = encodeURIComponent(
  siteConfig.whatsappMsg

)
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

// ─── CONTACT INFO ITEMS ───────────────────────────────────────────────────────

const CONTACT_INFO = [
  {
    icon: "📞",
    label: "Call / WhatsApp",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_DISPLAY}`,
  },
  {
    icon: "✉️",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: "📍",
    label: "Service Area",
    value: `${ADDRESS_LINE1} — ${ADDRESS_LINE2}`,
    href: null,
  },
  {
    icon: "🕐",
    label: "Working Hours",
    value: siteConfig.working_hours,
    href: null,
  },
]

// ─── WHY CONTACT US ───────────────────────────────────────────────────────────

const TRUST_POINTS = [
  { icon: "⚡", text: "Quote within 1 hour" },
  { icon: "🔧", text: "Free site visit" },
  { icon: "📋", text: "No hidden charges" },
  { icon: "🛡️", text: "Up to 10 years warranty based on service" },
]

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, phone, service, message } = formData

    const text = `Hi Sonu Fabrication! 👋

I'd like to get a quote for your services.

*Name:* ${name}
*Phone:* ${phone}
*Service Needed:* ${service || "Not specified"}
*Message:* ${message}`

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
    window.open(url, "_blank")
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="bg-gray-900 pt-32 pb-16 text-white text-center relative overflow-hidden">
        {/* Subtle dot pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-4">
          <span className="inline-block text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-5 tracking-wide">
            Get In Touch
          </span>
          <h1 className="text-4xl font-bold sm:text-5xl leading-tight">
            Let&apos;s Discuss Your Project
          </h1>
          <p className="mt-4 text-gray-400 text-base leading-relaxed max-w-xl mx-auto">
            Share your requirements and we&apos;ll get back with a free quote within 1 hour. No commitment needed.
          </p>

          {/* Trust badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {TRUST_POINTS.map((p) => (
              <span
                key={p.text}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1.5 text-xs text-white"
              >
                <span>{p.icon}</span> {p.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="grid gap-12 lg:grid-cols-5">

            {/* ── FORM (3 cols) ── */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Send Your Requirements</h2>
                <p className="text-sm text-gray-500 mb-7">
                  Fill in the details below and we&apos;ll open WhatsApp with your message pre-filled.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400/20 transition"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      type="tel"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400/20 transition"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Service Required
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400/20 transition appearance-none cursor-pointer"
                    >
                      <option value="">Select a service...</option>
                      <option value="Aluminium Work">🪟 Aluminium Work</option>
                      <option value="ACP Work">🧩 ACP Work</option>
                      <option value="Glass Work">🔲 Glass Work</option>
                      <option value="Partition Work">🧱 Partition Work</option>
                      <option value="UPVC Work">🚪 UPVC Work</option>
                      <option value="Multiple Services">🔧 Multiple Services</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                      Project Details <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your requirements — location, size, material preferences, timeline, etc."
                      rows={5}
                      required
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400/20 transition resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2.5 rounded-xl bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 active:scale-[0.98] transition"
                  >
                    {submitted ? (
                      <>✅ Sent! WhatsApp should be open now.</>
                    ) : (
                      <>
                       <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
                        Send via WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    This will open WhatsApp with your message. We respond within 1 hour.
                  </p>
                </form>
              </div>
            </div>

            {/* ── INFO (2 cols) ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Contact details card */}
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-5">Contact Information</h3>
                <ul className="space-y-5">
                  {CONTACT_INFO.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span className="text-xl mt-0.5 shrink-0">{item.icon}</span>
                      <div>
                        <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wide mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="text-sm font-medium text-gray-800 hover:text-green-600 transition"
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <p className="text-sm font-medium text-gray-800">{item.value}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💬</span>
                  <h3 className="text-base font-semibold text-gray-900">Prefer Direct Chat?</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  Skip the form — just ping us on WhatsApp directly and we&apos;ll reply within the hour.
                </p>
                <Link
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white hover:bg-green-600 transition active:scale-95"
                >
                 <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
                  Open WhatsApp
                </Link>
              </div>

              {/* Call CTA */}
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📞</span>
                  <h3 className="text-base font-semibold text-gray-900">Call Us Directly</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Mon–Sat, 9 AM to 7 PM. Our team will answer your questions on the spot.
                </p>
                <Link
                  href={`tel:+91${WHATSAPP_NUMBER}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition active:scale-95"
                >
                  📞 {PHONE_DISPLAY}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GOOGLE MAP ── */}
      <section className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-green-600 mb-1">Service Area</p>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">We Serve {siteConfig.stats.citiesServed} cities</h2>
            <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
              Covering {siteConfig.stats.citiesServed} Cities and surrounding areas. Contact us to confirm if we serve your location.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            {/* <iframe
              src={`https://www.google.com/maps/place/Metal+Kohinoor/@28.6440837,77.1975795,10z/data=!3m1!4b1!4m6!3m5!1s0xa6e8e186845445ed:0x55925f8c2ca4a716!8m2!3d28.6440837!4d77.1975795!16s%2Fg%2F11z5wpn_b2?hl=en&entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D`}
              width="100%"
              height="380"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="border-0 w-full"
            /> */}
          <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448194.8211962483!2d77.19757949999999!3d28.6440837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6e8e186845445ed%3A0x55925f8c2ca4a716!2sMetal%20Kohinoor!5e0!3m2!1sen!2sin!4v1776101836969!5m2!1sen!2sin"
  width="600"
  height="450"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
  className="border-0 w-full"
/>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <p className="mb-3 text-sm font-medium text-green-100">10 Years of Experience • Delhi-NCR</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Get a free consultation today. No commitment — just share your requirements and we&apos;ll guide you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-xl hover:bg-green-50 transition active:scale-95"
            >
               <Image src="/whatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
              Get Quote on WhatsApp
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              View Our Services →
            </Link>
          </div>
          <p className="mt-6 text-sm text-green-100 opacity-80">
            ✅ Free site visit &nbsp;•&nbsp; ✅ Detailed quote &nbsp;•&nbsp; ✅ No hidden charges
          </p>
        </div>
      </section>
    </>
  )
}

export default ContactPage