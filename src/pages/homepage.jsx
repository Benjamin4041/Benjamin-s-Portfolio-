import About from "../components/About.jsx";
import ContactLinks from "../components/ContactLinks.jsx";
import Experience from "../components/Experience.jsx";
import GitHubActivity from "../components/GitHubActivity.jsx";
import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import TechStack from "../components/TechStack.jsx";
import Testimonials from "../components/Testimonials.jsx";
import WhyWorkWithMe from "../components/WhyWorkWithMe.jsx";

export default function HomePage({ onOpenPalette }) {
  return (
    <>
      <Hero onOpenPalette={onOpenPalette} />
      <About />
      <ContactLinks />
      <Projects limit={4} />
      <Experience />
      <TechStack />
      <WhyWorkWithMe />
      <Testimonials />
      <GitHubActivity />
    </>
  );
}
