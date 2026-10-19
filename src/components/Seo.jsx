import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://benjaminanoruo.netlify.app";
export const SITE_NAME = "Benjamin Anoruo";
export const DEFAULT_TITLE = "Benjamin Anoruo — Fullstack React Developer";
export const DEFAULT_DESCRIPTION =
  "Benjamin Anoruo is a fullstack developer crafting robust web apps, intuitive UIs, and scalable solutions with React, Node.js and the cloud.";
// TODO(benjamin): add a 1200x630 social preview image (e.g. /assets/og-image.png) and set it here.
export const DEFAULT_OG_IMAGE = "";

// Per-route <title>, description, Open Graph and Twitter tags.
export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
}) {
  const { pathname } = useLocation();
  const url = `${SITE_URL}${pathname}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}
      <meta
        name="twitter:card"
        content={image ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}
