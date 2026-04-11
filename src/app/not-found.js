// app/not-found.js
"use client"
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, ArrowLeft, Mail, Phone, MapPin, Clock,ImageIcon } from 'lucide-react';
import { siteConfig } from '@/lib/config/site';

// export const metadata = {
//   title: 'Page Not Found | 404 - Metal Kohinoor',
//   description: 'The page you are looking for does not exist. Explore our fabrication services or contact us for assistance.',
//   robots: {
//     index: false,
//     follow: true,
//   },
// };

export default function NotFound() {
  const whatsappNumber = siteConfig.whatsapp.replace(/^\+/, '');
  const whatsappMsg = encodeURIComponent(siteConfig.whatsappMsg);
  const waLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  // Popular pages suggestions
  const popularPages = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Services', href: '/services', icon: Search },
    { name: 'Projects', href: '/projects', icon: ImageIcon },
    { name: 'Contact Us', href: '/contact', icon: Mail },
  ];

  return (
    <>
      {/* JSON-LD for 404 page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "404 - Page Not Found",
            "description": "The requested page could not be found.",
            "mainEntity": {
              "@type": "SiteNavigationElement",
              "name": "Popular Pages",
              "url": popularPages.map(p => p.href)
            }
          })
        }}
      />

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-screen-xl px-4 py-20 md:py-32">
          <div className="text-center">
            {/* 404 Number */}
            <div className="relative inline-block">
              <h1 className="text-8xl md:text-9xl font-bold text-gray-200 select-none">
                404
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-green-500/10 animate-pulse" />
              </div>
            </div>

            {/* Error Message */}
            <div className="mt-8 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Oops! Page Not Found
              </h2>
              <p className="mx-auto max-w-md text-gray-600">
                The page you are looking for might have been removed, had its name changed, 
                or is temporarily unavailable.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-600 active:scale-95"
              >
                <Home size={18} />
                Go to Homepage
              </Link>
              <Link
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
              >
                <Image src="/whatsapp.svg" alt="WhatsApp" width={18} height={18} />
                Contact Support
              </Link>
            </div>

          

            {/* Popular Pages */}
            <div className="mt-16">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Popular Pages
              </h3>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {popularPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-green-300 hover:bg-green-50 hover:text-green-700"
                  >
                    <page.icon size={16} />
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-16 border-t border-gray-200 pt-12">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                Need Help?
              </h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-3xl mx-auto">
                {/* Phone */}
                <Link
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 transition hover:border-green-300 hover:bg-green-50"
                >
                  <Phone size={16} className="text-green-500" />
                  Call Us
                </Link>

                {/* WhatsApp */}
                <Link
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 transition hover:border-green-300 hover:bg-green-50"
                >
                  <Image src="/whatsapp.svg" alt="WhatsApp" width={16} height={16} />
                  WhatsApp
                </Link>

                {/* Email */}
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 transition hover:border-green-300 hover:bg-green-50"
                >
                  <Mail size={16} className="text-green-500" />
                  Send Email
                </Link>

                {/* Location */}
                <Link
                  href="/contact#map"
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-700 transition hover:border-green-300 hover:bg-green-50"
                >
                  <MapPin size={16} className="text-green-500" />
                  Visit Us
                </Link>
              </div>
            </div>

            {/* Business Hours Note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
              <Clock size={12} />
              <span>Available {siteConfig.working_hours}</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}