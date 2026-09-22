import type { Project } from "@/data/projects";

const BASE_URL = "https://asjid-siddique-chi.vercel.app";

export function ProjectJsonLd({ project }: { project: Project }) {
  const data = {
    "@context": "https://schema.org",
    "@type": project.githubUrl ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${BASE_URL}/projects/${project.slug}`,
    ...(project.githubUrl && { codeRepository: project.githubUrl }),
    ...(project.liveUrl && { sameAs: [project.liveUrl] }),
    programmingLanguage: project.technology,
    author: {
      "@type": "Person",
      name: "Asjid Siddique",
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ project }: { project: Project }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${BASE_URL}/#projects`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${BASE_URL}/projects/${project.slug}`,
      },
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
