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
// study pages; the old Works page said Raven Bank June 2022, Roqqu July 2022,
// SpencerZill Aug 2022 and Bridge May 2022.
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
    overview: "TODO(benjamin): write a real overview for Raven Bank",
    outcome: "TODO(benjamin): add the outcome for Raven Bank (optional, remove if not needed)",
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
      // TODO(benjamin): this repeats the first image; replace with a different screenshot or remove.
      {
        src: "/assets/images/161945144665791.62924c011add7.jpg",
        alt: "Raven Bank landing page shown on desktop and laptop mockups",
      },
    ],
    // TODO(benjamin): supply three distinct preview screenshots for the homepage folder card.
    previewImages: [
      "/assets/images/161945144665791.62924c011add7.jpg",
      "/assets/images/Screenshot 2025-08-20 at 1.28.33 pm.png",
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
    overview: "TODO(benjamin): write a real overview for Roqqu",
    outcome: "TODO(benjamin): add the outcome for Roqqu (optional, remove if not needed)",
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
    overview: "TODO(benjamin): write a real overview for SpencerZill",
    outcome: "TODO(benjamin): add the outcome for SpencerZill (optional, remove if not needed)",
    projectGoals: [
      "Workflow optimization & productivity improvements",
      "Cross-browser compatible frontend development",
      "Collaboration with UX to guide product design decisions",
    ],
    technologies: [
      "JavaScript",
      "HTML5",
      "CSS3 / Sass",
      "UX Collaboration",
      "Deployment Automation",
    ],
    techTodo:
      "TODO(benjamin): confirm the real SpencerZill stack (React/Next.js?) and update the list",
    // TODO(benjamin): add case study screenshots for SpencerZill.
    images: [],
    // TODO(benjamin): supply three distinct preview screenshots for the homepage folder card.
    previewImages: [
      "https://res.cloudinary.com/ba-foods/image/upload/v1708872646/Screenshot_2024-02-24_at_5.31.23_pm_swr1uh.png",
    ],
    siteUrl: "https://spencerzill.com/",
  },
  bridge: {
    slug: "bridge",
    legacyKey: "Bridge",
    companyName: "Bridge",
    category: "Fullstack",
    imageUrl:
      "https://res.cloudinary.com/ba-foods/image/upload/v1750273699/gjrduondyy4bnohl1v2c.png", // main cover image
    imageAlt:
      "Bridge website homepage with the 'Automate Your Trading Success' hero and exchange integrations",
    // TODO(benjamin): this video is named "Raven 3d Patterns intro" but was shown on the Bridge card. Confirm it's the right video.
    videoPublicId: "v1756424876/Raven_3d_Patterns_intro_twwnyv",
    role: "Full-Stack Developer",
    period: "2024",
    copy: `Bridge is a MERN-stack trade copier application that enables seamless trade mirroring across multiple accounts. It allows traders to execute trades on a master account and instantly replicate them to linked accounts, ensuring accuracy, speed, and consistency in trading strategies.`,
    overview: "TODO(benjamin): write a real overview for Bridge",
    outcome: "TODO(benjamin): add the outcome for Bridge (optional, remove if not needed)",
    github: "TODO(benjamin): add the GitHub URL for Bridge",
    projectGoals: [
      "Build a robust MERN-stack trade copier application",
      "Enable instant trade replication across multiple accounts",
      "Ensure secure, encrypted communication between master and slave accounts",
      "Optimize real-time data handling for low latency execution",
    ],
    technologies: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "WebSockets",
      "Encryption Protocols",
    ],
    // TODO(benjamin): add case study screenshots for Bridge.
    images: [],
    // TODO(benjamin): supply three distinct preview screenshots for the homepage folder card.
    previewImages: [
      "https://res.cloudinary.com/ba-foods/image/upload/v1750273699/gjrduondyy4bnohl1v2c.png",
    ],
    siteUrl: "https://bridge-testnet.netlify.app/",
  },
};

// Old links looked like /project/:RavenBank — map those names to slugs.
export const legacySlugs = Object.fromEntries(
  Object.values(projectDetails).map((p) => [p.legacyKey, p.slug])
);

export default projectDetails;
