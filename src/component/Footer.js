import React from 'react'
import Link from 'next/link'
import { siteConfig } from '@/lib/config/site'
import Image from 'next/image'
// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const BRAND_NAME    = siteConfig.businessName
const BRAND_TAGLINE = siteConfig.location
const BRAND_DESC    = siteConfig.description

const PHONE   = siteConfig.phone
const EMAIL   = siteConfig.email
const ADDRESS = siteConfig.location

const WHATSAPP_NUMBER = siteConfig.whatsapp.replace(/^\+/, '')
const WHATSAPP_MSG = encodeURIComponent(
  siteConfig.whatsappMsg
)
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

const QUICK_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'Projects',  href: '/projects' },
  { label: 'About Us',  href: '/about' },
  { label: 'Contact',   href: '/contact' },
]

const SERVICE_LINKS = [
  { label: 'Aluminium Work', href: '/services?section=aluminium-work' },
  { label: 'ACP Work',       href: '/services?section=acp-work' },
  { label: 'Glass Work',     href: '/services?section=glass-work' },
  { label: 'Partition Work', href: '/services?section=partition-work' },
  { label: 'UPVC Work',      href: '/services?section=upvc-work' },
]

const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href: WA_LINK,
    icon: (
      <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
    ),
  },
  {
    label: 'Instagram',
    href: `${siteConfig?.social?.instagram}`,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: `${siteConfig?.social?.facebook}`,
    icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
      </svg>
    ),
  },
]

const CURRENT_YEAR = new Date().getFullYear()

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">

      {/* ── Main Footer ── */}
      <div className="mx-auto max-w-screen-xl px-4 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-500 shadow-sm group-hover:bg-green-600 transition">
                <span className="text-white font-bold text-sm">
                  {BRAND_NAME.charAt(0)}{BRAND_NAME.lastIndexOf(' ') > 0 ? BRAND_NAME.charAt(BRAND_NAME.lastIndexOf(' ') + 1) : ''}

                </span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-bold text-gray-900">{BRAND_NAME}</span>
                <span className="text-[10px] text-gray-500 tracking-wide">{BRAND_TAGLINE}</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {BRAND_DESC}
            </p>
            {/* Social Icons */}
            <div className="mt-5 flex gap-2">
              {SOCIAL_LINKS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-green-600 hover:border-green-300 transition"
                >
                  {s.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-green-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-green-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="text-green-500 mt-0.5 text-base">📞</span>
                <div>
                  <p className="text-xs text-gray-500">Call / WhatsApp</p>
                  <Link href={`tel:${PHONE}`} className="text-sm font-medium text-gray-800 hover:text-green-600 transition">{PHONE}</Link>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-green-500 mt-0.5 text-base">✉️</span>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <Link href={`mailto:${EMAIL}`} className="text-sm font-medium text-gray-800 hover:text-green-600 transition">{EMAIL}</Link>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-green-500 mt-0.5 text-base">📍</span>
                <div>
                  <p className="text-xs text-gray-500">Service Area</p>
                  <p className="text-sm font-medium text-gray-800">{ADDRESS}</p>
                </div>
              </li>
            </ul>
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600 transition active:scale-95"
            >
               <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " /> WhatsApp Us
            </Link>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {CURRENT_YEAR} {BRAND_NAME}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-gray-700 transition">Privacy Policy</Link>
            <Link href="/terms-and-condition" className="text-xs text-gray-500 hover:text-gray-700 transition">Terms & Conditions</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer