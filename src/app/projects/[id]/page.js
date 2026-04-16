// app/projects/[id]/page.js
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects,getProjectById, getRelatedProjects } from '@/lib/projects';
import { siteConfig } from '@/lib/config/site';
import ProjectMedia from '@/component/ProjectMedia';
import WhatSappButton from '@/component/WhatSappButton';
import { MapPin,Calendar,Briefcase  } from 'lucide-react';
export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = getProjectById(id);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }
  
  return {
    title: project.seo?.title || `${project.title} | Metal Kohinoor Projects`,
    description: project.seo?.description || project.shortDescription || project.description.substring(0, 160),
    keywords: `${project.category}, fabrication projects, ${project.location}, metal work, ACP cladding, glass partition, aluminium windows, upvc work, metal fabrication, metal kohinoor projects, sonu fabrication portfolio, sonu fabricator`,
    openGraph: {
      title: project.seo?.title || project.title,
      description: project.seo?.description || project.shortDescription,
      url: `https://metalkohinoor.com/projects/${project.id}`,
      siteName: 'Metal Kohinoor',
      images: project.media
        .filter(m => m.type === 'image')
        .slice(0, 2)
        .map(m => ({
          url: m.url,
          width: 1200,
          height: 630,
          alt: m.alt || project.title,
        })),
      locale: 'en_IN',
      type: 'article',
      publishedTime: new Date().toISOString(),
    },
    alternates: {
      canonical: `https://metalkohinoor.com/projects/${project.id}`,
    },
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = getProjectById(id);
  // console.log("Project ID:", id);
  // console.log("Project Data:", project);
  if (!project) {
    notFound();
  }
  
  const relatedProjects = getRelatedProjects(project.id, 3);
  const hasVideo = project.media.some(m => m.type === 'video');
  
  const whatsappMsg = encodeURIComponent(
    `Hi, I'm interested in your project: ${project.title}\n\n` +
    `Location: ${project.location}\n` +
    `Category: ${project.category}\n\n` +
    `Please share more details and a quote.`
  );
  const waLink = `https://wa.me/${siteConfig.whatsapp.replace(/^\+/, '')}?text=${whatsappMsg}`;
  
  return (
    <main className="mt-15">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "description": project.description,
            "locationCreated": {
              "@type": "Place",
              "name": project.location
            },
            "creator": {
              "@type": "LocalBusiness",
              "name": siteConfig.businessName,
              "url": "https://metalkohinoor.com"
            },
            "dateCreated": project.completion,
            "keywords": project.features.join(", "),
            "image": project.media.filter(m => m.type === 'image').map(m => m.url)
          })
        }}
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gray-900 pt-32 pb-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-300">
            <Link href="/projects" className="hover:text-green-400 transition">Projects</Link>
            <span>/</span>
           {project?.category && (
            <span className="text-green-400">{project.category}</span>
           )}
          </div>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-gray-300">
          {project.location && (
            <span className="flex items-center gap-1">
              <MapPin size={16} />
              {project.location}
            </span>
         ) }  
            {project.completion && (
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                Completed: {project.completion}
              </span>
            )}
           {project.clientType && (
            <span className="flex items-center gap-1">
              <Briefcase size={16} />
              {project.clientType}
            </span>
            )}
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Left Column - Media */}
            <div className="lg:col-span-2">
              <ProjectMedia media={project.media} title={project.title} />
              
              {/* Description */}
           {project?.description &&(

           <div className="mt-8">
                <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
                <p className="mt-4 text-gray-600 leading-relaxed">{project.description}</p>
              </div>
           )}   
              
              {/* Features */}
          {project.features && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900">Key Features</h3>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
          )}
              {/* Specifications */}
              {project.specs && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-gray-900">Technical Specifications</h3>
                  <div className="mt-4 grid gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:grid-cols-2">
                    {Object.entries(project.specs).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-xs font-medium uppercase text-gray-500">{key}</p>
                        <p className="text-sm font-medium text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Quote Card */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900">Interested in Similar Work?</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Get a free quote for your project. We respond within 1 hour.
                  </p>
                  <Link
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                  >
                    <Image src="/whiteWhatsapp.svg" alt="WhatsApp" width={18} height={18} />
                    Get Quote on WhatsApp
                  </Link>
                  <Link
                    href="/contact"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    Contact Form →
                  </Link>
                </div>
                
                {/* Quick Info */}
            {!project?.category || !project?.clientType || !project?.completion || !project?.location ? null : (
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <h4 className="font-semibold text-gray-900">Project Details</h4>
                <dl className="mt-4 space-y-3">
                  {project?.category && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Category</dt>
                      <dd className="text-sm font-medium text-gray-900">{project.category}</dd>
                    </div>
               )}
                  {project?.clientType && (
                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Client Type</dt>
                      <dd className="text-sm font-medium text-gray-900">{project.clientType}</dd>
                    </div>
                  )}
                  {project?.completion && (

                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Completion Year</dt>
                      <dd className="text-sm font-medium text-gray-900">{project.completion}</dd>
                    </div>
                  )}
                  {project?.location && (

                    <div className="flex justify-between">
                      <dt className="text-sm text-gray-500">Location</dt>
                      <dd className="text-sm font-medium text-gray-900">{project.location}</dd>
                    </div>
                  )}
                  </dl>
                </div>
            )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-screen-xl px-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Related Projects</h2>
            <p className="mt-2 text-center text-gray-600">Explore similar work in {project.category}</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {relatedProjects.map((related) => (
                <Link key={related.id} href={`/projects/${related.id}`} className="group block">
                  <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={related.media.find(m => m.type === 'image')?.url || related.media[0]?.url}
                        alt={related.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition">
                        {related.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {related.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="relative overflow-hidden bg-green-600 py-20 text-white">
        <div className="relative mx-auto max-w-screen-xl px-4 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Ready to Start Your Project?</h2>
          <p className="mx-auto mt-4 max-w-xl text-green-100">
            Get a free consultation and detailed quote within 1 hour.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
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
}