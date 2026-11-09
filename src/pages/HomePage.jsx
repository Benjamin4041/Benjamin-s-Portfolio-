import About from "../components/About.jsx";
import ContactLinks from "../components/ContactLinks.jsx";
import Experience from "../components/Experience.jsx";
import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import TechStack from "../components/TechStack.jsx";
import Testimonials from "../components/Testimonials.jsx";
import WhyWorkWithMe from "../components/WhyWorkWithMe.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects limit={4} />
      <About />
      <ContactLinks />
      <Experience />
      <TechStack />
      <WhyWorkWithMe />
      <Testimonials />
    </>
  );
}
