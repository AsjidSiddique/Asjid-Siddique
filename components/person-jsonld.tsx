import { site } from "@/data/site";

// Rendered once on the homepage. This is what lets Google (and AI
// assistants that read structured data) know this page is specifically
// about a person named Asjid Siddique, their role, and their profiles —
// rather than guessing from prose. Every field here is already stated
// elsewhere on the site; nothing new is asserted here.
export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.headline,
    description: site.seo.description,
    url: "https://asjid-siddique-chi.vercel.app",
    sameAs: [site.links.github, site.links.linkedin],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: site.university,
    },
    knowsAbout: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Explainable AI",
      "Software Engineering",
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
