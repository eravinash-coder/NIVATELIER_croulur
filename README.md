# Canvas Studio

A viral-style semicircle product carousel built with React + Vite.

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build

```bash
npm run build
```

## Structure

```
src/
  components/
    Carousel/       # Main semicircle carousel logic + layout
    Cursor/         # Custom gold cursor
    Header/         # Top navigation bar
    ProductCard/    # Individual card with generated artwork
  data/
    products.js     # Product definitions
  utils/
    generateArtwork.js  # Canvas-based procedural art generator
  App.jsx
  main.jsx
  index.css
```

## Controls

- Click any card to bring it to center
- Arrow buttons (left/right)
- Keyboard ← → arrows
- Click & drag / swipe
- Dots at bottom
- Auto-rotates every 3.2s
