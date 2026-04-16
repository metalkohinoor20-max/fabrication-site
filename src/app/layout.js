import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import WhatSappButton from "@/component/WhatSappButton";
import { siteConfig,servicesSchema } from "@/lib/config/site";
import Script from "next/script";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO Metadata for the entire website
export const metadata = {
  metadataBase: new URL('https://metalkohinoor.com'),
  title: {
    default: `${siteConfig.businessName} | Professional Fabrication Services in ${siteConfig.city}`,
    template: `%s | ${siteConfig.businessName}`
  },
  description: `${siteConfig.description} ${siteConfig.stats.experience} experience, ${siteConfig.stats.projects} projects completed. Specialists in ACP cladding, glass partitions, aluminium windows & UPVC work. Free quote within 1 hour.`,
  keywords: `fabrication services ${siteConfig.city.toLowerCase()}, acp cladding ${siteConfig.city.toLowerCase()}, glass partition ${siteConfig.city.toLowerCase()}, aluminium windows ${siteConfig.city.toLowerCase()}, upvc work delhi ncr, metal fabrication noida, shop front fabrication gurgaon, aluminium door manufacturer, glass railing installation, acp sheet installation, glass partition office, aluminium louvers, metal kohinoor delhi, sonu fabrication noida, metal kohinoor`,
  authors: [{ name: siteConfig.owner, url: 'https://metalkohinoor.com' }],
  creator: siteConfig.businessName,
  publisher: siteConfig.businessName,
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://metalkohinoor.com',
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Professional Fabrication Services in Delhi NCR`,
    description: `${siteConfig.description} ${siteConfig.stats.experience} experience. Get free quote within 1 hour.`,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} - Fabrication Services`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.businessName} | Fabrication Services`,
    description: siteConfig.description,
    images: ['/og-image.jpg'],
    creator: `@${siteConfig.social?.twitterHandle}`,
  },
  alternates: {
    canonical: 'https://metalkohinoor.com',
    languages: {
      'en-IN': 'https://metalkohinoor.com',
      'hi-IN': 'https://metalkohinoor.com/hi',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'business',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#22c55e',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

// ✅ VIEWPORT - Separate export for viewport related properties
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#22c55e',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  const whatsappNumber = siteConfig.whatsapp.replace(/^\+/, '');
  const whatsappMsg = encodeURIComponent(siteConfig.whatsappMsg);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://metalkohinoor.com" />
        
        {/* Language alternatives */}
        <link rel="alternate" hrefLang="en" href="https://metalkohinoor.com" />
        <link rel="alternate" hrefLang="hi" href="https://metalkohinoor.com/hi" />
        <link rel="alternate" hrefLang="x-default" href="https://metalkohinoor.com" />
        
        {/* RSS Feed */}
        <link rel="alternate" type="application/rss+xml" title="RSS" href="/feed.xml" />
      </head>
      <body className="min-h-full flex flex-col">
        <Script
  id="fb-pixel"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');

      fbq('init', '${process.env.NEXT_PUBLIC_PIXEL_ID}');
      fbq('track', 'PageView');
    `,
  }}
/>
        {/* JSON-LD Schema for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": siteConfig.businessName,
              "url": "https://metalkohinoor.com",
              "logo": "https://metalkohinoor.com/logo.png",
              "image": "https://metalkohinoor.com/og-image.jpg",
              "description": siteConfig.description,
              "email": siteConfig.email,
              "telephone": siteConfig.phone,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.location,
                "addressLocality": `${siteConfig.city}`,
                "addressRegion": `${siteConfig.state}`,
                "addressCountry": "IN"
              },
              "sameAs": [
                `https://wa.me/${whatsappNumber}`,
                "https://www.instagram.com/metalkohinoor",
                "https://www.facebook.com/metalkohinoor",
                "https://www.linkedin.com/company/metalkohinoor"
              ].filter(Boolean),
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": siteConfig.phone,
                "contactType": "customer service",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              },
              "foundingDate": `${siteConfig.foundingYear} || null`,
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": `${siteConfig.numberOfEmployees} || null`,
              },
              "slogan": "Precision Fabrication for Modern Spaces",
              "award": "Best Fabrication Service in Delhi NCR - 2024"
            })
          }}
        />

        {/* JSON-LD Schema for WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": siteConfig.businessName,
              "url": "https://metalkohinoor.com",
              "description": siteConfig.description,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://metalkohinoor.com/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              },
              "inLanguage": "en-IN"
            })
          }}
        />

        {/* JSON-LD Schema for LocalBusiness (Enhanced) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": siteConfig.businessName,
              "description": siteConfig.description,
              "url": "https://metalkohinoor.com",
              "telephone": siteConfig.phone,
              "email": siteConfig.email,
              "address": {
                "@type": "PostalAddress",
                "streetAddress": siteConfig.location,
                "addressLocality": `${siteConfig.city}`,
                "addressRegion": `${siteConfig.state}`,
                "postalCode": `${siteConfig.postalCode || ''}`,
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "28.6495",
                "longitude": "77.2369"
              },
              // "openingHoursSpecification": [
              //   {
              //     "@type": "OpeningHoursSpecification",
              //     "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              //     "opens": "09:00",
              //     "closes": "19:00"
              //   }
              // ],
              "priceRange": "₹₹",
              "areaServed": siteConfig.areaServed,
             "hasMap": "https://maps.google.com/?q=Shahid+Nagar+Metro+Station+kalyan+chownk+Delhi+India",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "150",
                "bestRating": "5",
                "worstRating": "1"
              },
              "makesOffer": [
              // fetch from servicesSchema
                ...servicesSchema.map(service => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": service.name,
                    "description": service.description,
                    "serviceType": service.serviceType
                  },
                  "priceSpecification": {
                    "@type": "PriceSpecification",
                    "priceCurrency": "INR",
                    "price": "Contact for pricing"
                  }
                }))
              ],
              "potentialAction": {
                "@type": "CommunicateAction",
                "name": "Get Free Quote",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`,
                  "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                  ]
                }
              }
            })
          }}
        />

        <Navbar />
        {children}
        <WhatSappButton />
        <Footer />
      </body>
    </html>
  );
}