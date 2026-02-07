# AGENTS.md

Guidance for coding agents working in this repository.

## Project overview
- This repository hosts a Gatsby-based personal website.
- Main source code lives under `src/`.
- Build and runtime configuration live in Gatsby config files at repo root.

## Setup and common commands
- Install dependencies: `npm install`
- Start local development server: `npm run develop` (or `npm start`)
- Build production output: `npm run build`
- Format source files: `npm run format`

## Working norms
- Keep changes focused and minimal for the requested task.
- Prefer existing patterns in `src/components` and `src/pages` before introducing new structures.
- Use Prettier formatting conventions already configured in the repo.
- Do not add new dependencies unless they are required for the task.

## Validation expectations
- For code changes, run relevant checks before finishing:
  - `npm run build` for production build validation.
  - `npm run format` when editing JS/CSS files.
- If a command cannot run due to environment limits, report that clearly.

## Documentation
- Update `README.md` when user-facing behavior, commands, or architecture changes.
- Keep comments and docs concise and practical.
