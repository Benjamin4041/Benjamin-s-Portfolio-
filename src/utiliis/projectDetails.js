// Single source of truth for project data. The Works page (videos.js),
// the homepage folder cards (WorksSection) and the case study pages
// (ProjectPage) all read from here so dates and names can't drift.

const CLOUDINARY = "https://res.cloudinary.com/ba-foods";

// Values starting with "TODO(" are placeholders for real content. They show
// in development only and are hidden from the production site.
export const isTodo = (value) =>
  typeof value === "string" && value.startsWith("TODO(");

export const showContent = (value) =>
  Boolean(value) && (import.meta.env.DEV || !isTodo(value));

// Serve Cloudinary images resized and in the best format for the browser.
// Non-Cloudinary (local) paths are returned unchanged.
export const cldImage = (url, transform = "f_auto,q_auto,w_1600") =>
  url && url.startsWith(`${CLOUDINARY}/image/upload/`)
    ? url.replace("/image/upload/", `/image/upload/${transform}/`)
    : url;

// Compressed MP4 (also converts the SpencerZill .mov) and a first-frame poster.
export const cldVideo = (publicId) =>
  `${CLOUDINARY}/video/upload/f_mp4,q_auto,w_1280/${publicId}.mp4`;
export const cldPoster = (publicId) =>
  `${CLOUDINARY}/video/upload/so_0,w_1280,q_auto/${publicId}.jpg`;

// TODO(benjamin): confirm the `period` dates below. They come from the case
// study pages; the old Works page said Raven Bank June 2022, Roqqu July 2022
// and SpencerZill Aug 2022.
const projectDetails = {
  "raven-bank": {
    slug: "raven-bank",
    legacyKey: "RavenBank",
    companyName: "Raven Bank",
    category: "Frontend",
    imageUrl:
      "https://res.cloudinary.com/ba-foods/image/upload/v1753693942/screenshot-20250728100552_cueeuo.png", // main cover image
    imageAlt:
      "Raven Bank website homepage with the 'Seamless Banking for Individuals' hero and a banking app preview",
    videoPublicId: "v1756424877/Raven_WebApp_UI_Interaction_rehdfi",
    role: "Frontend Developer",
    period: "2022 – 2023",
    copy: `At RavenBank, I developed scalable frontend architecture and accessibility-focused components to support a modern banking platform. I implemented multilingual support, robust authentication, and optimized client-side systems, ensuring the application was secure, user-friendly, and resilient in production environments.`,
    overview: `Raven Bank is a digital banking platform for individuals and businesses, letting people send, receive and save money on the web and on mobile. I worked on the web frontend: a reusable component library, multilingual and localized experiences, and secure authentication and navigation flows, all built with accessibility and production reliability in mind.`,
    outcome: `A secure, accessible banking web app with multilingual support, built on a component library the team can keep extending.`,
    projectGoals: [
      "Create a scalable, maintainable frontend component library",
      "Enable multilingual and localized user experiences",
      "Build secure authentication and navigation flows",
      "Ensure production reliability through utility optimization",
    ],
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3 / Sass",
      "Localization & Routing Systems",
      "Accessibility Best Practices",
    ],
    techTodo:
      "TODO(benjamin): confirm the real Raven Bank stack (React/Next.js?) and update the list",
    images: [
      {
        src: "/assets/images/161945144665791.62924c011add7.jpg",
        alt: "Raven Bank landing page shown on desktop and laptop mockups",
      },
      {
        src: "/assets/images/Screenshot 2025-08-20 at 1.28.33 pm.png",
        alt: "Raven Bank homepage hero with account balances and a mobile banking app preview",
      },
      {
        src: "/assets/images/projects/raven_features.jpg",
        alt: "Raven Bank web app features section: transfers, savings, loans, debit cards and investments",
      },
    ],
    previewImages: [
      "/assets/images/161945144665791.62924c011add7.jpg",
      "/assets/images/Screenshot 2025-08-20 at 1.28.33 pm.png",
      "/assets/images/projects/raven_features.jpg",
    ],
    siteUrl: "https://getravenbank.com/",
  },
  roqqu: {
    slug: "roqqu",
    legacyKey: "Roqqu",
    companyName: "Roqqu",
    category: "Frontend",
    imageUrl:
      "https://res.cloudinary.com/ba-foods/image/upload/v1753694123/screenshot-20250728100526_dk1e6w.png", // main cover image
    imageAlt:
      "Roqqu website homepage with the 'Your freedom to do more with Money' hero illustration",
    videoPublicId: "v1756424877/Discover_invest_earn_with_roqqu_iy9oqu",
    role: "Frontend Developer",
    period: "2023 – 2024",
    copy: `At Roqqu, I rebuilt and modernized the company’s marketing site while delivering polished, accessible, and performance-focused frontend applications for multiple clients. My work emphasized speed, design quality, and consistent delivery standards, improving both the product experience and development workflow.`,
    overview: `Roqqu is a crypto and payments app for trading crypto and sending and receiving money across borders. I rebuilt and modernized its marketing website with React and Gatsby, focusing on speed, accessibility and visual polish, and delivered frontend work for multiple clients to the same standard.`,
    outcome: `A faster, more polished and accessible marketing site, delivered alongside a more consistent, standardized frontend workflow.`,
    projectGoals: [
      "Modernize and optimize marketing website architecture",
      "Improve accessibility and visual polish in all delivered products",
      "Maintain high-quality, standardized frontend codebases",
      "Ensure timely, client-focused delivery",
    ],
    technologies: [
      "React",
      "Gatsby",
      "JavaScript",
      "HTML5",
      "CSS3 / Sass",
      "Accessibility Best Practices",
    ],
    images: [
      {
        src: "/assets/images/Screenshot 2025-08-20 at 1.33.50 pm.png",
        alt: "Roqqu homepage hero with an isometric crypto illustration",
      },
      {
        src: "/assets/images/Screenshot 2025-08-20 at 1.34.34 pm.png",
        alt: "Roqqu 'Seize the moment' section with app store buttons and trading app screens",
      },
      {
        src: "/assets/images/Screenshot 2025-08-20 at 1.34.53 pm.png",
        alt: "Roqqu 'Seize the Moment. Seize your Future.' sign-up section with coin illustrations",
      },
      {
        src: "/assets/images/Group 1.png",
        alt: "Roqqu mobile app screens: portfolio balance, Roqqu card and NFT collection",
      },
    ],
    previewImages: [
      "/assets/images/Screenshot 2025-08-20 at 1.33.50 pm.png",
      "/assets/images/Screenshot 2025-08-20 at 1.34.34 pm.png",
      "/assets/images/Screenshot 2025-08-20 at 1.34.53 pm.png",
    ],
    siteUrl: "https://roqqu.com/",
  },
  spencerzill: {
    slug: "spencerzill",
    legacyKey: "SpencerZill",
    companyName: "SpencerZill",
    category: "Fullstack",
    imageUrl:
      "https://res.cloudinary.com/ba-foods/image/upload/v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png", // main cover image
    imageAlt:
      "SpencerZill website homepage with the green Z logo over a red spinning wheel background",
    videoPublicId: "v1756424887/SpencerZill_k41w3v",
    role: "Full-Stack Developer",
    period: "2021 – Present",
    copy: `At Spencerzill Studio, I led impactful development initiatives that streamlined workflows, improved deployment efficiency, and enhanced the user experience across multiple products. My contributions directly reduced operational bottlenecks and enabled teams to ship features faster while maintaining high code quality.`,
    overview: `SpencerZill is a creative studio producing animation, branding, motion and VFX work for brands and agencies. As a full-stack developer there, I lead development initiatives across multiple products, working with the UX team on product design decisions and building cross-browser compatible frontends.`,
    outcome: `Streamlined workflows and more efficient deployments, so the team ships features faster while keeping code quality high.`,
    projectGoals: [
      "Workflow optimization & productivity improvements",
      "Cross-browser compatible frontend development",
      "Collaboration with UX to guide product design decisions",
    ],
    // Stack confirmed from the live spencerzill.com build (React app with
    // Bootstrap 4, ReactPlayer for Vimeo/YouTube, Cloudinary media, on Vercel)
    technologies: [
      "React",
      "JavaScript",
      "HTML5",
      "CSS3 / Sass",
      "Bootstrap",
      "ReactPlayer (Vimeo & YouTube)",
      "Cloudinary",
      "Vercel",
      "UX Collaboration",
      "Deployment Automation",
    ],
    images: [
      {
        src: "/assets/images/projects/spencerzill_1.jpg",
        alt: "SpencerZill 'Making impossible things exist' intro with portfolio filters for animation, branding, motion and VFX",
      },
      {
        src: "/assets/images/projects/spencerzill_2.jpg",
        alt: "SpencerZill portfolio grid of 3D, motion and VFX projects",
      },
      {
        src: "/assets/images/projects/spencerzill_4.jpg",
        alt: "SpencerZill 'Upcoming Works' section with project previews",
      },
    ],
    previewImages: [
      "https://res.cloudinary.com/ba-foods/image/upload/v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png",
      "/assets/images/projects/spencerzill_2.jpg",
      "/assets/images/projects/spencerzill_4.jpg",
    ],
    siteUrl: "https://spencerzill.com/",
  },
};

// Old links looked like /project/:RavenBank — map those names to slugs.
export const legacySlugs = Object.fromEntries(
  Object.values(projectDetails).map((p) => [p.legacyKey, p.slug])
);

export default projectDetails;
