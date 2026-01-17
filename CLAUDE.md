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
- `src/pages/` - Route-based pages (index.js, projects.js, photos.js, etc.)
- `src/components/` - Reusable React components
  - `layout.js` - Main layout wrapper with header and SEO
  - `timeline.js` & `timelineStyle.js` - Custom timeline component for experience section
  - `header.js` - Site header navigation
  - `image.js` - Gatsby image wrapper
- `src/images/` - Static assets and images
- `src/styles/` - CSS modules for specific pages
- `gatsby-config.js` - Gatsby configuration with plugins

### Key Components
- **Layout Component**: Uses StaticQuery for site metadata, includes Header and provides consistent page structure with SEO via react-helmet
- **Timeline Component** (`timeline.js` + `timelineStyle.js`): Displays work experience with years, titles, and descriptions using styled-components
- **MilkyWayBackground**: Animated canvas-based starry background with configurable star density, twinkle effects, and drift animation

### Styling Approach
- Primary styling via styled-components for component-level styles
- CSS modules for page-specific styles (index.module.css, projects.module.css, etc.)
- Global styles in layout.css

### Content Management
- Static content managed directly in React components
- Images optimized through Gatsby's image processing pipeline
- No CMS - content updates require code changes