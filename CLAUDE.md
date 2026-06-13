# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

### Development
- `npm run develop` or `npm start` - Start development server
- `npm run build` - Build production site
- `npm run format` - Format code with Prettier

### Code Quality
- `npm run format` - Format all JavaScript files in src/ with Prettier
- No test suite configured (test script exits with code 0)

### Deployment
- `npm run deploy` - Build and deploy to GitHub Pages using gh-pages
- **CI/CD**: GitHub Actions auto-deploys on push to `source` branch (see `.github/workflows/deploy.yml`)
- **Branch strategy**: `source` is the main development branch; `master`/`gh-pages` is for deployed output

## Architecture

This is a personal portfolio website built with **Gatsby 5** and **React 18**, using **styled-components** for styling.

### Tech Stack
- **Framework**: Gatsby (React-based static site generator)
- **Styling**: styled-components (CSS-in-JS)
- **Images**: gatsby-plugin-image with gatsby-plugin-sharp for optimized images
- **SEO**: react-helmet for meta tags
- **Deployment**: GitHub Pages via gh-pages package

### Project Structure
- `src/pages/` - Route-based pages (index.js, projects.js, photos.js, resume.js, 404.js)
- `src/components/` - Reusable React components
  - `layout.js` - Main layout wrapper providing SEO meta tags (per-page titles via the `pageTitle` prop) and global CSS
- `src/images/` - Static assets and images
- `static/fonts/` - Self-hosted Crimson Text and Inter woff2 files (preloaded in gatsby-ssr.js)
- `gatsby-config.js` - Gatsby configuration with plugins

### Key Components
- **Layout Component**: Uses StaticQuery for site metadata and provides consistent page structure with SEO via react-helmet
- **Photos Gallery** (`pages/photos.js`): Full-screen horizontal scroll-snap carousel with auto-advance (disabled for prefers-reduced-motion), keyboard navigation, and scroll-position sync

### Styling Approach
- All component styling via styled-components
- Design language: near-black page background (#090909), light "paper" panels (#d8d8d6), Crimson Text serif, lowercase headings
- Global styles and resets in `src/components/layout.css`

### Content Management
- Static content managed directly in React components
- Images optimized through Gatsby's image processing pipeline
- No CMS - content updates require code changes