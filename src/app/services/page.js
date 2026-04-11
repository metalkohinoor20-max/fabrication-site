// app/services/page.js
import { Metadata } from 'next';
import Services from '@/component/Services';
import { siteConfig } from '@/lib/config/site';
import { servicesSchema } from '@/lib/config/site';
export const metadata = {
  title: `Fabrication Services | ${siteConfig.businessName} - ACP, Glass, Aluminium, UPVC`,
  description: `Professional ${siteConfig.services.join(', ')} services in Delhi NCR. ${siteConfig.stats.experience} experience, ${siteConfig.stats.projects} projects delivered. Free site visit & quote within 1 hour.`,
  keywords: 'fabrication services delhi, acp cladding services, glass partition installation, aluminium windows delhi, upvc windows gurgaon, shop front fabrication, metal work services',
  openGraph: {
    title: `Fabrication Services | ${siteConfig.businessName} - ACP, Glass, Aluminium & UPVC`,
    description: `Get professional ${siteConfig.services.join(', ')} services in Delhi NCR. Free site visit, 1-hour quote response. Serving since ${siteConfig.stats.experience}.`,
    url: 'https://metalkohinoor.com/services',
    siteName: siteConfig.businessName,
    images: [
      {
        url: 'https://metalkohinoor.com/og-services.jpg',
        width: 1200,
        height: 630,
        alt: 'Metal Kohinoor Fabrication Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://metalkohinoor.com/services',
  },
};

export default function Page() {
  const whatsappNumber = siteConfig.whatsapp.replace(/^\+/, '');
  const whatsappMsg = encodeURIComponent(siteConfig.whatsappMsg);
  
  // Services list for schema


  return (
    <>
      {/* JSON-LD Schema for Services Page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": `Fabrication Services | ${siteConfig.businessName}`,
            "description": siteConfig.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": siteConfig.businessName,
              "url": "https://metalkohinoor.com",
              "telephone": siteConfig.phone,
              "email": siteConfig.email,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": `${siteConfig.city}`,
                "addressRegion": `${siteConfig.state}`,
                "addressCountry": "IN"
              },
              "priceRange": "₹₹",
              "areaServed": siteConfig.areaServed.map(city => ({
                "@type": "City",
                "name": city
              })),
              "openingHours": "Mon-Sat 09:00-19:00"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Fabrication Services",
              "itemListElement": servicesSchema.map((service, index) => ({
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": service.name,
                  "description": service.description,
                  "serviceType": service.serviceType
                },
                "position": index + 1
              }))
            },
            "areaServed": {
              "@type": "City",
              "name": `${siteConfig.city}`
            },
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

      {/* BreadcrumbList Schema */}
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
                "name": "Services",
                "item": "https://metalkohinoor.com/services"
              }
            ]
          })
        }}
      />

      {/* LocalBusiness Schema for Service Areas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": siteConfig.businessName,
            "image": "https://metalkohinoor.com/logo.png",
            "telephone": siteConfig.phone,
            "email": siteConfig.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": siteConfig.location,
              "addressLocality": "Delhi",
              "addressRegion": "Delhi NCR",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "28.6139",
              "longitude": "77.2090"
            },
            "priceRange": "₹₹",
            "openingHours": `${siteConfig.working_hours.replace(/:\s*/g, '')}`,
            "areaServed": siteConfig.areaServed,
            "hasMap": "https://maps.google.com/?q=Delhi+NCR",
            "sameAs": [
              `https://wa.me/${whatsappNumber}`,
              siteConfig.social?.instagram,
              siteConfig.social?.facebook
            ].filter(Boolean),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />

      {/* Original Services Component - No Changes */}
      <Services />
    </>
  );
}