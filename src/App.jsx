import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage";
import About from "./pages/about";
import Works from "./pages/works";
import { ModeProvider } from "./context/mode";
import Contact from "./pages/contact";
import NavbarOptions from "./components/NavbarOptions";
import { MobileNavToggole } from "./context/MobileNavToggole";
import Projects from "./components/LandingpageProjects/Projects";
import ReactLenis, { useLenis } from "lenis/react";
import ProjectPage from "./pages/ProjectPage";
import SelectedWorks from "./pages/selectedWorks/SelectedWorks";
import projectDetails from "./utiliis/projectDetails";
import ScrollToTop from "./hooks/scrolltotop";

export default function App() {
  const lenis = useLenis(({ scroll }) => {});
  return (
    <ReactLenis root>
      <MobileNavToggole>
        <ModeProvider>
          <Router>
            <>
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/about" element={<About />} />
                <Route path="/works" element={<SelectedWorks />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/testing" element={<SelectedWorks />} />
                <Route
                  path="/project/:projectName"
                  element={<ProjectPageWrapper />}
                />
                <Route
                  path="/test"
                  element={<WorksSection />}
                />
              </Routes>
            </>
          </Router>
        </ModeProvider>
      </MobileNavToggole>
    </ReactLenis>
  );
}

// Wrapper to fetch details by param
import { useParams } from "react-router-dom";
import WorksSection from "./components/WorksSection/WorksSection";

function ProjectPageWrapper() {
  const { projectName } = useParams();
  const details = projectDetails[projectName.split(":")[1]];
  console.log(details);
  return <ProjectPage details={details} />;
}
