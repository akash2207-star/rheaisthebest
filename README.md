## Rhea is the best

This is a tiny static site (frontend only).

### Run it

- **Fastest**: double-click `index.html`
- **Recommended (local server)**:

```bash
python3 -m http.server 5173
```

Then open `http://localhost:5173/#rhea-is-the-best`.

### Add your photos (two options)

#### Put images in `assets/` (best)

1. Copy your images into `assets/`
2. EITHER name them `1.jpg`, `2.jpg`, `3.jpg`... (auto-detected),
   OR edit `script.js` and set:

```js
const ASSET_PHOTOS = ["assets/1.jpg", "assets/2.jpg", "assets/3.jpg"];
```

