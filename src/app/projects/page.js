// app/projects/page.js
import { Metadata } from 'next';
import { projects, getAllCategories, getAllLocations } from '@/lib/projects';
import ProjectsClient from '@/component/ProjectsList';

export const metadata = {
  title: 'Our Projects | Metal Kohinoor - Fabrication Work Portfolio',
  description: 'Explore our portfolio of premium fabrication projects including ACP cladding, glass partitions, aluminium windows, and more. 100+ successful projects across Delhi NCR.',
  keywords: 'fabrication projects, ACP work portfolio, glass partition projects, aluminium windows, metal fabrication delhi',
  openGraph: {
    title: 'Metal Kohinoor Projects Portfolio',
    description: 'View our completed fabrication projects - ACP cladding, glass work, aluminium installations',
    url: 'https://metalkohinoor.com/projects',
    siteName: 'Metal Kohinoor',
    images: [
      {
        url: 'https://metalkohinoor.com/og-projects.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://metalkohinoor.com/projects',
  },
};

export default function ProjectsPage() {
  const categories = getAllCategories();
  const locations = getAllLocations();

  return (
    <>
      {/* JSON-LD Schema for Projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Metal Kohinoor Fabrication Projects",
            "description": "Portfolio of completed fabrication projects",
            "numberOfItems": projects.length,
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `https://metalkohinoor.com/projects/${project.id}`,
              "name": project.title
            }))
          })
        }}
      />
      <ProjectsClient 
        initialProjects={projects} 
        categories={categories}
        locations={locations}
      />
    </>
  );
}