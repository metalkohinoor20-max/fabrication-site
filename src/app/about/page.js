// app/about/page.js  —  Server Component (no "use client")
// SEO metadata exported from here; actual UI lives in About.js (Client Component)
import About from "@/component/About"
import { siteConfig } from "@/lib/config/site"

// ─── SEO METADATA ─────────────────────────────────────────────────────────────

export const metadata = {
  title: `About Us | ${siteConfig.businessName} — ${siteConfig.stats.experience}+ Years of Aluminium & ACP Work`,
  description:
    `Meet ${siteConfig.businessName} — a professional aluminium fabricator with ${siteConfig.stats.experience} of experience in ACP cladding, glass work, louvers and aluminium doors & windows across ${siteConfig.location}.`,
  keywords: [
    `aluminium fabricator ${siteConfig.location}`,
    `ACP cladding contractor ${siteConfig.location}`,
    `glass work ${siteConfig.location}`,
    `aluminium doors windows ${siteConfig.location}`,
    `fabrication contractor ${siteConfig.location}`,
    `${siteConfig.businessName} about`,
  ],
  openGraph: {
    title: `About ${siteConfig.businessName} — ${siteConfig.stats.experience} Years of Precision Fabrication`,
    description:
      `Trusted aluminium, ACP and glass fabrication contractor serving ${siteConfig.location}. ${siteConfig.stats.projects} projects delivered with quality guaranteed.`,
    url: "https://sonufabrication.com/about",
    siteName: `${siteConfig.businessName}`,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `About ${siteConfig.businessName} — Aluminium & ACP Expert, ${siteConfig.location}`,
    description:
      `${siteConfig.stats.experience}+ years of experience in aluminium, ACP cladding and glass work. Serving ${siteConfig.location}.`,
  },
  alternates: {
    canonical: "https://sonufabrication.com/about",
  },
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

// JSON-LD structured data for Google (LocalBusiness schema)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: `${siteConfig.businessName}`,
  description:
    `Professional aluminium, ACP cladding and glass fabrication services across ${siteConfig.location} with ${siteConfig.stats.experience}+ years of experience.`,
  telephone: `${siteConfig.phone}`,
  email: `${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: `${siteConfig.location}`,
    addressRegion: `${siteConfig.location}`,
    addressCountry: "IN",
  },
  areaServed: `${siteConfig.areaServed.join(", ")}`,
  knowsAbout: [
    "Aluminium Fabrication",
    "ACP Cladding",
    "Glass Work",
    "UPVC Windows",
    "Partition Work",
    "Louvers",
  ],
  // foundingDate: "2014",
  // numberOfEmployees: "10",
}

const AboutPage = () => {
  return (
    <>
      {/* Inject JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <About />
    </>
  )
}

export default AboutPage