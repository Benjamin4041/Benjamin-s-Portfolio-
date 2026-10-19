import projectDetails, { cldPoster, cldVideo } from "../utiliis/projectDetails";

// Order of the stacked cards on the Works page.
const WORKS_ORDER = ["bridge", "raven-bank", "roqqu", "spencerzill"];

export const videos = WORKS_ORDER.map((slug) => {
  const project = projectDetails[slug];
  return {
    slug,
    path: cldVideo(project.videoPublicId),
    poster: cldPoster(project.videoPublicId),
    title: project.companyName,
    category: project.category,
    date: project.period,
  };
});
