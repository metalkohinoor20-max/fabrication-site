// app/page.js
import { Metadata } from 'next';
import Home from '@/component/Home';
import { servicesSchema ,testimonialsList,siteConfig } from '@/lib/config/site';
export const metadata = {
  title: `${siteConfig.businessName} | Premium Fabrication Services in Delhi NCR`,
  description: `${siteConfig.description} ${siteConfig.stats.experience} experience, ${siteConfig.stats.projects} projects delivered. Specialists in ACP cladding, glass partitions, aluminium windows & UPVC work. Free quote within 1 hour.`,
  keywords: `fabrication services delhi, acp cladding noida, glass partition gurgaon, aluminium windows delhi, upvc work, metal fabrication, shop front fabrication, aluminium door manufacturer, glass railing installation`,
  openGraph: {
    title: `${siteConfig.businessName} | Professional Fabrication Services Delhi NCR`,
    description: `${siteConfig.stats.experience} of expertise in ACP, Glass, Aluminium & UPVC work. ${siteConfig.stats.projects}+ projects completed. Get free quote today!`,
    url: 'https://metalkohinoor.com',
    siteName: siteConfig.businessName,
    images: [
      {
        url: 'https://metalkohinoor.com/og-home.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} - Fabrication Services`,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://metalkohinoor.com',
  },
};

export default function Page() {
  const whatsappNumber = siteConfig.whatsapp.replace(/^\+/, '');
  const whatsappMsg = encodeURIComponent(siteConfig.whatsappMsg);
  return (
    <>
      {/* JSON-LD Schema for LocalBusiness */}
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
            "image": "https://metalkohinoor.com/og-home.jpg",
            "telephone": siteConfig.phone,
            "email": siteConfig.email,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": siteConfig.location,
              "addressLocality": `${siteConfig.city}`,
              "addressRegion": `${siteConfig.state}`,
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "28.6139",
              "longitude": "77.2090"
            },
            "openingHours": `${siteConfig.working_hours.replace(/:\s*/g, '')}`,
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
            },
            "hasMap": "https://maps.google.com/?q=Delhi+NCR"
          })
        }}
      />

      {/* JSON-LD Schema for Services */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Fabrication Services",
            "description": siteConfig.description,
            "provider": {
              "@type": "LocalBusiness",
              "name": siteConfig.businessName,
              "url": "https://metalkohinoor.com"
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
            }
          })
        }}
      />

      {/* JSON-LD Schema for Reviews/Testimonials */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": siteConfig.businessName,
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            },
            "review": testimonialsList.map(testimonial => ({
              "@type": "Review",
              "author": {
                "@type": "Person",
                "name": testimonial.author
              },
              "reviewBody": testimonial.reviewBody,
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": testimonial.rating,
                "bestRating": "5"
              }
            }))
          })
        }}
      />

      {/* JSON-LD Schema for FAQ (from services) */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does fabrication work take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Typical residential jobs take 2–5 days depending on scope. Commercial projects are planned in phases."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide free site visit?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we provide free site visit across Delhi NCR to assess your requirements and take measurements."
                }
              },
              {
                "@type": "Question",
                "name": "What warranty do you provide?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We provide 1-year workmanship warranty and the materials carry manufacturer warranty."
                }
              },
              {
                "@type": "Question",
                "name": "Do you serve all areas of Delhi NCR?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we serve all areas including Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad."
                }
              }
            ]
          })
        }}
      /> */}

      {/* JSON-LD Schema for BreadcrumbList */}
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
              }
            ]
          })
        }}
      />

      {/* JSON-LD Schema for Potential Action (WhatsApp) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": siteConfig.businessName,
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

      {/* Original Home Component - No Changes */}
      <Home />
    </>
  );
}