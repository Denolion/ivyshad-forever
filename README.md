# IVYSHAD FOREVER ❤️

A premium romantic surprise website dedicated to Ivyshad Jepchumba, crafted with love by Denolion.

## Features

- Magical animated welcome screen with circular portrait photo
- Romantic love letter with typewriter animation
- Photo gallery with full-screen lightbox
- Reasons You're Special animated counter
- Random love message generator
- Animated digital love envelope
- Virtual rose garden with clickable wishes
- Surprise overlay with floating hearts
- Continuous background music player (play/pause/mute)
- Floating hearts and sparkle particles
- Smooth navigation with mobile menu
- Back-to-top button
- Fully responsive — optimised for Redmi Android and all devices

## Requirements

- Node.js 18 or later
- npm 9 or later

## Add the photographs

The website uses two photographs of Ivyshad. The first photo is referenced at `public/images/IMG-20261017-WA0003.jpg` for the welcome screen, and the second photo is referenced at `public/images/IMG-20261017-WA0002.jpg` for the gallery section. If you replace them, keep those filenames or update the paths in `src/config/siteConfig.ts`.

## Add the music

Copy your romantic MP3 file to `public/music/ivyshad-love-song.mp3`. Music starts only after Ivyshad clicks the opening button, then loops continuously throughout the website.

## Local installation

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit — Ivyshad Forever website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ivyshad-forever.git
git push -u origin main
```

## Deploy to Vercel

Import the GitHub repository into Vercel. Vercel will detect the Vite project automatically; use the default build settings.

## Deploy to GitHub Pages

Add `base: '/ivyshad-forever/'` to `vite.config.ts`, install `gh-pages`, then build and deploy the `dist` directory. The site is otherwise ready for static hosting.

## Personalisation

All names, text, colours, messages, and asset paths are stored in `src/config/siteConfig.ts`.

## Credits

Crafted with love by **Denolion** 💻❤️

*IVYSHAD FOREVER ❤️*
