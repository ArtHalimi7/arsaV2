# ARSA Gipser

Marketing website for a Swiss plastering and drywall company, built with React, Tailwind CSS and Framer Motion.

**Live site:** [arsagipser.ch](https://arsagipser.ch)

## Overview

ARSA Gipser is a plastering and drywall business (Gipser, Trockenbau, Spachtelarbeiten, Akustikbau) based in Volketswil, Switzerland. This repository holds its German-language website: a four-page single-page app that presents the company's services, shows its work with before/after comparisons, and turns visitors into enquiries by phone, WhatsApp or a contact form. It was designed and built by Art Halimi.

## Features

- Four routed pages (Home, Über uns, Projekte, Kontakt), with an Apache rewrite rule so deep links resolve on shared hosting.
- Branded splash screen that slides away into the app, plus Lenis smooth scrolling across the site.
- Scroll-driven services section: on desktop, vertical scrolling moves a row of service panels sideways while blueprint-style SVG details move at their own speeds. On mobile it switches to a stacked card layout.
- Drag-to-compare before/after slider on the Projects page, for both mouse and touch.
- Contact form that checks each field on blur and again on submit, then sends through EmailJS and shows loading, success and error states.
- WhatsApp-style chat widget with a typing indicator. It opens a WhatsApp conversation with the visitor's message already filled in.
- Navigation bar that hides when you scroll down and comes back when you scroll up. The hero headline rotates through the company's trades, and the Home page also has a testimonials carousel and an embedded map.
- SEO groundwork: titles, descriptions, Open Graph and Twitter tags and a canonical URL for each page, `LocalBusiness` structured data, `sitemap.xml` and `robots.txt`.

## Tech stack

- React 18 and React Router 6
- Vite 5
- Tailwind CSS 3
- Framer Motion (animation, scroll-linked motion, page transitions)
- Lenis (smooth scrolling)
- EmailJS (contact form delivery)
- Heroicons and React Icons

## Technical highlights

- **Sideways scrolling inside a vertical page.** [`HorizontalScrollSection.jsx`](src/components/HorizontalScrollSection.jsx) uses a 300vh section with a sticky viewport. Framer Motion's `useScroll` progress is mapped to a `translateX` on the panel row, and the same progress value works out which panel is active and drives the parallax decorations. A small `matchMedia` hook loads a separate mobile component, so phones never mount the scroll-linked desktop layout.
- **Before/after slider that stays aligned.** In [`Projects.jsx`](src/pages/Projects.jsx), the "before" image sits in a wrapper whose width follows the slider. The image inside keeps a fixed width equal to the container, which is measured on resize. Both photos therefore stay lined up pixel for pixel at any slider position or screen size.
- **App shell.** [`App.jsx`](src/App.jsx) sets up Lenis with an exponential ease-out curve, runs it from a `requestAnimationFrame` loop and removes it on unmount. It uses `AnimatePresence` to hand over from the splash screen to the routed app.
- **SEO in a single-page app.** [`seo.js`](src/lib/seo.js) is a small helper that adds or updates the description, Open Graph, Twitter and canonical tags when each page mounts. [`index.html`](index.html) carries schema.org `LocalBusiness` data for local search.
- **Navbar that reacts to scroll direction.** [`Navbar.jsx`](src/components/Navbar.jsx) watches the page's scroll position through Framer Motion's `useMotionValueEvent`. It only hides or shows after 10px of movement, so small scroll jitters don't make it flicker.

## Getting started

**Prerequisites:** Node.js 18 or newer, and npm.

```bash
npm install
npm run dev
```

| Script            | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the Vite dev server with hot reload |
| `npm run build`   | Build the production bundle into `dist/`  |
| `npm run preview` | Serve the production build locally        |
| `npm run lint`    | Run ESLint over the project               |

The contact form uses the EmailJS service and template configured in [`src/pages/Contact.jsx`](src/pages/Contact.jsx). To receive messages from your own copy, swap in your own EmailJS account details there. No environment variables are needed.

## Project structure

```
arsaV2/
├── public/              # .htaccess (SPA rewrite), robots.txt, sitemap.xml
├── src/
│   ├── assets/images/   # project, service and team photography
│   ├── components/      # page sections: Hero, HorizontalScrollSection, ProcessSection, ...
│   │   └── ui/          # splash screen, rotating headline
│   ├── lib/             # seo.js (per-page meta tags), utils.js
│   ├── pages/           # Home, About, Projects, Contact
│   ├── App.jsx          # router, splash screen, smooth scrolling
│   └── main.jsx
├── index.html           # meta tags and LocalBusiness structured data
└── tailwind.config.js
```

## Author

Designed and built by [Art Halimi](https://arthalimi.com) · [GitHub](https://github.com/ArtHalimi7)
