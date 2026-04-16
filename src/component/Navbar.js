"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'
import Image from 'next/image'
// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const BRAND_NAME = siteConfig.businessName
const BRAND_TAGLINE = siteConfig.location

const NAV_LINKS = [
  { label: 'Home',      href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'About',     href: '/about' },
  { label: 'Contact',   href: '/contact' },
]

const WHATSAPP_NUMBER = siteConfig.whatsapp.replace(/^\+/, '')
const WHATSAPP_MSG = encodeURIComponent(
  siteConfig.whatsappMsg
)
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-3 flex items-center justify-between z-50"> 

        {/* ── Brand ── */}
     <Link href="/" className="flex items-center gap-2.5 group">
  <Image
    src="/logo.png"
    alt={BRAND_NAME}
    width={160}
    height={95}
    className="h-15.5  w-auto object-contain"
    priority
  />
</Link>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA + Mobile Toggle ── */}
        <div className="flex items-center gap-3">
          <Link
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 active:scale-95"
          >
            <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
            Get Quote
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 pt-2 z-50 shadow-xl">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-600"
            >
              💬 Get Free Quote on WhatsApp
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar