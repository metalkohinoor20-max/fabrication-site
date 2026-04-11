// app/contact/page.js
import { Metadata } from 'next';
import ContactPage from '@/component/Contact';
import { siteConfig } from '@/lib/config/site';

export const metadata = {
  title: `${siteConfig.businessName} | Contact Us for Fabrication Services in Delhi NCR`,
  description: 'Get a free quote for ACP cladding, glass partitions, aluminium windows, and UPVC work. Our team responds within 1 hour. Serving Delhi NCR since 10+ years.',
  keywords: 'contact fabrication services, get quote for ACP work, aluminium windows contact, glass partition delhi, metal fabrication contact, fabrication services noida, upvc windows gurgaon',
  openGraph: {
    title: `${siteConfig.businessName} | Contact Us for Fabrication Services`,
    description: 'Share your project requirements and get a detailed quote within 1 hour. Free site visit available across Delhi NCR.',
    url: 'https://metalkohinoor.com/contact',
    siteName: siteConfig.businessName,
    images: [
      {
        url: 'https://metalkohinoor.com/og-contact.jpg',
        width: 1200,
        height: 630,
        alt: 'Contact Metal Kohinoor for Fabrication Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://metalkohinoor.com/contact',
  },
};

export default function Page() {
  const whatsappNumber = siteConfig.whatsapp.replace(/^\+/, '');
  const whatsappMsg = encodeURIComponent(siteConfig.whatsappMsg);
  
  return (
    <>
      {/* JSON-LD Schema for Contact Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": siteConfig.businessName,
            "description": siteConfig.description,
            "url": "https://metalkohinoor.com",
            "logo": "https://metalkohinoor.com/logo.png",
            "image": "https://metalkohinoor.com/og-image.jpg",
            "telephone": siteConfig.phone,
            "email": siteConfig.email,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": `${siteConfig.city}`,
              "addressRegion": `${siteConfig.state}`,
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "28.6139",
              "longitude": "77.2090"
            },
            "openingHours": [
              `${siteConfig.working_hours.replace(/:\s*/g, '')}`,
               
            ],
            "sameAs": [
              `https://wa.me/${whatsappNumber}`,
              siteConfig.social?.instagram,
              siteConfig.social?.facebook
            ].filter(Boolean),
            "priceRange": "₹₹",
            "areaServed": {
              "@type": "City",
              "name": `${siteConfig.city}`
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Fabrication Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "ACP Cladding"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Glass Partitions"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Aluminium Windows"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "UPVC Work"
                  }
                }
              ]
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": siteConfig.phone,
              "contactType": "customer service",
              "areaServed": "IN",
              "availableLanguage": ["English", "Hindi"]
            },
            "potentialAction": {
              "@type": "CommunicateAction",
              "name": "Get Quote",
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
      
      {/* BreadcrumbList Schema for better SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://metalkohinoor.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact Us",
                "item": "https://metalkohinoor.com/contact"
              }
            ]
          })
        }}
      />
      
      {/* Original Contact Component - No Changes */}
      <ContactPage />
    </>
  );
}