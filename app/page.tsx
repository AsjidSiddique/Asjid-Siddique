import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Research } from "@/components/research";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Journey } from "@/components/journey";
import { Experience } from "@/components/experience";
import { Education } from "@/components/education";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { PersonJsonLd } from "@/components/person-jsonld";

export default function Home() {
  return (
    <>
      <PersonJsonLd />
      <Nav />
      <main id="main-content" className="relative">
        <Hero />
        <Research />
        <Projects />
        <About />
        <Journey />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
