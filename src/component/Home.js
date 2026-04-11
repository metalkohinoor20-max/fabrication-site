"use client"
import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { siteConfig } from '@/lib/config/site'
// ─── CONSTANTS ────────────────────────────────────────────────────────────────
import { projects } from '@/lib/projects'
const WHATSAPP_NUMBER = siteConfig.whatsapp.replace(/^\+/, '')
const WHATSAPP_MSG = encodeURIComponent(
  siteConfig.whatsappMsg
)
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`

// ─── DATA ─────────────────────────────────────────────────────────────────────

// Supports Type: "Image" | "Video"
// For Video, Link should be a path to an mp4 / webm file
const HERO_MEDIA = [
  { id: 1, link: '/hero/image1.png', type: 'Image' },
  { id: 2, link: '/hero/image2.png', type: 'Image' },
  // { id: 3, link: '/hero/video1.mp4', type: 'Video' },
]

const HERO_HEADING    = 'Fabrication Services with Precision & Quality'
const HERO_SUBHEADING = 'Doors, windows, partitions — tailored solutions for every space.'

const SERVICES = [
  { icon: '🪟', title: 'Aluminium Work',  desc: 'Lightweight, rust-proof doors, windows and sliding frames built to last.' },
  { icon: '🧩', title: 'ACP Work',         desc: 'Modern front elevation panels for shops, malls and commercial spaces.' },
  { icon: '🔲', title: 'Glass Work',       desc: 'Toughened glass doors, office cabins and stylish shower enclosures.' },
  { icon: '🧱', title: 'Partition Work',   desc: 'Divide spaces cleanly with aluminium, glass or wooden partitions.' },
  { icon: '🚪', title: 'UPVC Work',        desc: 'Soundproof, waterproof windows and doors with minimal maintenance.' },
]

const PROJECTS = projects.filter(project => project.showOnHome)
  .map(p => ({
    id: p.id,
    title: p.title,
    desc: p.shortDescription,
    src: p.media[0].url,
    alt: p.media[0].alt
  })) 


const TESTIMONIALS = [
  { id: 1, name: 'Rahul Sharma',  location: 'Meerut',     rating: 5, text: 'The glass partition for our office was executed perfectly. Great quality and timely delivery.' },
  { id: 2, name: 'Priya Gupta',   location: 'Delhi',      rating: 5, text: 'Our shop\'s ACP front looks exactly how we imagined. Clean finish and professional work.' },
  { id: 3, name: 'Mohit Verma',   location: 'Ghaziabad',  rating: 4, text: 'Installed UPVC windows — the soundproofing is impressive. Smooth experience overall.' },
]

const STATS = [
  { value: siteConfig.stats.projects, label: 'Projects Completed' },
  { value: siteConfig.stats.experience, label: 'Years of Experience' },
  { value: siteConfig.stats.citiesServed,    label: 'Cities Served' },
  { value: siteConfig.stats.satisfaction, label: 'Quality Guaranteed' },
]

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

const WhatsAppButton = ({ label = 'Get Free Quote', className = '' }) => (
  <Link
    href={WA_LINK}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 active:scale-95 ${className}`}
  >
    
    {/* use svg from public */}
    <Image src="/whiteWhatsapp.svg" alt="WhatsApp"  width={20} height={20} className="shrink-0 " />
    {label}
  </Link>
)

// ─── SECTION COMPONENTS ───────────────────────────────────────────────────────

// Slide can be Image or Video
const HeroSlide = ({ item, priority = false }) => {
  if (item.type === 'Video') {
    return (
      <video
        src={item.link}
        autoPlay
        muted
        loop
        playsInline
        className="w-full xl:h-[70vh] object-cover"
      />
    )
  }
  return (
    <Image
      src={item.link}
      alt={`Hero slide`}
      width={1200}
      height={600}
      className="w-full xl:h-[70vh] object-cover"
      priority={priority}
    />
  )
}

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback((index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating, currentIndex])

  const next = useCallback(() => goTo((currentIndex + 1) % HERO_MEDIA.length), [goTo, currentIndex])
  const prev = useCallback(() => goTo((currentIndex - 1 + HERO_MEDIA.length) % HERO_MEDIA.length), [goTo, currentIndex])

  // Auto-advance (only for images; pause on video)
  useEffect(() => {
    if (HERO_MEDIA[currentIndex]?.type === 'Video') return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [currentIndex, next])

  return (
      <section className="relative overflow-hidden bg-neutral-950 content-visibility-auto">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {HERO_MEDIA.map((item, i) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <HeroSlide item={item} priority={i === 0} />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-15 md:py-8 text-center z-10">
        {/* <span className="mb-1 md:mb-4 inline-block rounded-full border border-green-500/40 bg-green-500/10 px-4 py-1.5 text-xs font-medium text-green-400 tracking-wide">
          {siteConfig.location} — {siteConfig.stats.experience} of Expertise
        </span> */}
        <h1 className="max-w-4xl text-2xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          {HERO_HEADING}
        </h1>
        <p className="mt-1 md:mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
          {HERO_SUBHEADING}
        </p>
        <div className="hidden md:flex mt-8  flex-wrap justify-center gap-4">
          <WhatsAppButton label="Get Free Quote" />
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition hover:border-white/50 hover:bg-white/10"
          >
            View Our Work →
          </Link>
        </div>
      </div>

      {/* Controls (only if more than 1 slide) */}
      {HERO_MEDIA.length > 1 && (
        <>
          <button
            onClick={prev}
            disabled={isAnimating}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/20 p-2 text-black transition hover:bg-black/40 disabled:opacity-40"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            disabled={isAnimating}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/20 p-2 text-black transition hover:bg-black/40 disabled:opacity-40"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-3 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {HERO_MEDIA.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-6 bg-green-600' : 'w-2 bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

// Stats bar
const StatsBar = () => (
  <section className="border-y border-gray-200 bg-white">
    <div className="mx-auto max-w-screen-xl px-4 py-8">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-green-600">{stat.value}</p>
            <p className="mt-1 text-xs text-gray-600">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

// Service card
const ServiceCard = ({ icon, title, desc }) => (
  <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/5">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-2xl">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-black">{title}</h3>
    <p className="mt-2 text-sm leading-relaxed text-gray-600">{desc}</p>
    <div className="mt-5 flex flex-col gap-2">
      <Link
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600 active:scale-95"
      >
        Get Quote
      </Link>
      <Link
        href={`/services?section=${title.toLowerCase().replace(/ /g, '-')}`}
        className="text-center text-sm text-gray-500 transition hover:text-gray-800"
      >
        View Details →
      </Link>
    </div>
  </div>
)

// Portfolio card
const PortfolioCard = ({ title, desc, src, alt, id }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-neutral-800">
    <div className="aspect-video overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={300}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        loading="lazy"
      />
    </div>
    {/* Overlay always visible on mobile, hover on desktop */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 transition duration-300 lg:opacity-0 lg:group-hover:opacity-100" />
    <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 opacity-100 transition duration-300 lg:opacity-0 lg:group-hover:opacity-100">
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-neutral-300 line-clamp-2">{desc}</p>
      <div className="mt-3 flex items-center gap-4">
        <Link
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-block rounded-lg bg-green-500 px-4 py-1.5 text-sm font-medium text-white transition hover:bg-green-600"
        >
          Get Quote
        </Link>
        <Link
          href={`/projects/${id.toLowerCase().replace(/ /g, '-')}`}
          className="pointer-events-auto text-sm text-white transition hover:underline"
        >
          View Details →
        </Link>
      </div>
    </div>
  </div>
)

// Testimonial card
const TestimonialCard = ({ name, location, text, rating }) => (
  <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-green-500/30">
    <div className="flex text-yellow-500">{Array.from({ length: 5 }, (_, i) => i < rating ? '★' : '☆').join('')}</div>
    <p className="mt-4 flex-1 text-sm leading-relaxed text-gray-700">
      &ldquo;{text}&rdquo;
    </p>
    <div className="mt-6 flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/15 text-sm font-semibold text-green-600">
        {name.charAt(0)}
      </div>
      <div>
        <p className="text-sm font-semibold text-black">{name}</p>
        <p className="text-xs text-gray-500">{location}</p>
      </div>
    </div>
  </div>
)

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const page = () => {
  return (
    <main className='mt-15' >
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. STATS BAR */}
      <StatsBar />

      {/* 3. SERVICES */}
      <section className="bg-white py-24 content-visibility-auto">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mb-14 text-center">
            <p className="mb-2 text-sm font-medium text-green-600">What We Do</p>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">Our Services</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Premium aluminium, ACP, glass & UPVC solutions — built with precision and durability.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SERVICES.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:bg-gray-100"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. PORTFOLIO PREVIEW */}
      <section className="bg-gray-50 py-24 content-visibility-auto">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mb-14 text-center">
            <p className="mb-2 text-sm font-medium text-green-600">Projects</p>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">Our Work in Action</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Real projects, real results — see the quality we deliver.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <PortfolioCard key={project.id} {...project} id={project.id} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:bg-gray-100"
            >
              View All Projects →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHATSAPP CTA */}
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <p className="mb-3 text-sm font-medium text-green-100">10 Years of Experience • Delhi-NCR</p>
          <h2 className="text-3xl font-bold sm:text-4xl">Get Your Free Quote Today</h2>
          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Planning aluminium, ACP, glass or UPVC work? Send us your requirements on WhatsApp
            and get a response within 1 hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-xl transition hover:bg-green-50 active:scale-95"
            >
              <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} className="shrink-0" />
              Get Quote on WhatsApp
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              View Our Work →
            </Link>
          </div>
          <p className="mt-6 text-sm text-green-100 opacity-80">
            ✅ Trusted by 500+ clients &nbsp;•&nbsp; ✅ Fast response &nbsp;•&nbsp; ✅ Quality guaranteed
          </p>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      {/* <section className="bg-white py-24 content-visibility-auto">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="mb-14 text-center">
            <p className="mb-2 text-sm font-medium text-green-600">Reviews</p>
            <h2 className="text-3xl font-bold text-black sm:text-4xl">What Our Clients Say</h2>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">
              Genuine feedback from satisfied customers across different cities.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </div>
      </section> */}

      {/* 7. CONTACT STRIP */}
      <section className="border-t border-gray-200 bg-gray-50 py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-bold text-black">Have a Project in Mind?</h3>
              <p className="mt-2 max-w-md text-sm text-gray-600">
                Talk to our team directly on call or WhatsApp. Or send detailed requirements via our contact form.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={`tel:+91${siteConfig.phone.replace(/^\+/, '')}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:bg-gray-100"
              >
                📞 Call Now
              </Link>
              <WhatsAppButton label="WhatsApp Us" />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Contact Form →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default page