// components/ProjectsClient.js
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, X, ChevronDown, MapPin, Calendar, Briefcase, ChevronRight } from 'lucide-react';
import { siteConfig } from '@/lib/config/site';

const WHATSAPP_NUMBER = siteConfig.whatsapp.replace(/^\+/, '');
const WHATSAPP_MSG = encodeURIComponent(siteConfig.whatsappMsg);
const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;

const ProjectsClient = ({ initialProjects, categories, locations }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Filter projects
  const filteredProjects = useMemo(() => {
    let filtered = initialProjects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedLocation !== 'All') {
      filtered = filtered.filter(p => p.location.includes(selectedLocation));
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [initialProjects, selectedCategory, selectedLocation, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setSearchQuery('');
  };

  return (
    <main className="mt-15">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 pt-32 pb-20">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <span className="inline-block rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-green-400">
            Our Portfolio
          </span>
          <h1 className="mt-5 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Craftsmanship That{' '}
            <span className="text-green-400">Tells a Story</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-gray-300">
            Explore our completed fabrication projects — each one built with precision, care, and attention to detail.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-green-600 active:scale-95"
            >
              <Image src="/whiteWhatsapp.svg" alt="WhatsApp" width={20} height={20} />
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-screen-xl px-4 py-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400/20"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden items-center gap-3 md:flex">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-green-400 focus:outline-none"
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:border-green-400 focus:outline-none"
              >
                <option value="All">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  <X size={16} />
                  Clear
                </button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2 text-sm md:hidden"
            >
              <Filter size={16} />
              Filters
              <ChevronDown size={14} className={showFilters ? 'rotate-180' : ''} />
            </button>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="mt-4 space-y-3 border-t border-gray-100 pt-4 md:hidden">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm"
              >
                <option value="All">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm"
              >
                <option value="All">All Locations</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              {(selectedCategory !== 'All' || selectedLocation !== 'All' || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 text-sm text-gray-600"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          {/* Results Count */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredProjects.length}</span> projects
            </p>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 rounded-full bg-gray-100 p-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">No projects found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 rounded-full bg-green-500 px-6 py-2 text-sm font-medium text-white hover:bg-green-600"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Get a free consultation and detailed quote within 1 hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "Contact", {
        content_name: "Get Quote Button",
        contact_method: "whatsapp",
      });
    }
  }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-green-700 shadow-xl transition hover:bg-green-50"
            >
              <Image src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
              Get Quote on WhatsApp
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Contact Form →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

// Project Card Component
const ProjectCard = ({ project }) => {
  const mainImage = project.media.find(m => m.type === 'image') || project.media[0];
  const hasVideo = project.media.some(m => m.type === 'video');

  return (
    <Link href={`/projects/${project.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {mainImage && (
            <Image
              src={mainImage.url}
              alt={mainImage.alt || project.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {hasVideo && (
            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 p-1.5">
              <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-600">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} />
              {project.completion}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600 transition">
            {project.title}
          </h3>

         

          <div className="mt-4 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <MapPin size={12} />
              {project.location.split(',')[0]}
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-green-600 group-hover:gap-2 transition-all">
              View Details
              <ChevronRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectsClient;