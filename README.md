# Benjamin Anoruo: Portfolio

Portfolio site built with React, Vite and Tailwind CSS.

    npm install
    npm run dev      # local development
    npm run build    # production build in dist/
    npm run preview  # preview the production build

## Editing

- Text, projects, experience, skills and links: `src/data/content.json`
- Globe tooltips and cards: `src/data/globeTech.js`
- Page sections: `src/components/`
- Routes: `src/App.jsx`

The globe's land points in `src/data/globePoints.json` come from `scripts/gen_globe_points.py`, which reads the `land-110m.json` file from the `world-atlas` npm package (Natural Earth data).
