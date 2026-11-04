# Benjamin Anoruo: Portfolio (globe redesign)

Static build of the portfolio with an interactive 3D globe in the hero. Deploy the `dist/` folder as it is; there is no build step.

Preview locally:

    python3 build-tools/serve_benjamin.py dist 4173

`build-tools/` holds the scripts that produced `dist/assets/index-benjamin.js`. `build_benjamin.py` patches a downloaded template bundle (not included in this repo) with this portfolio's content, and `ben_globe.js` is the globe component it injects.
