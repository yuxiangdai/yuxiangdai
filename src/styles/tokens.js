export const theme = {
  colors: {
    background: '#0a0b0e',
    backgroundAlt: '#0d1015',
    text: '#e8e6e1',
    textMuted: '#b8b5b0',
    accent: '#2d5a87',
    border: 'rgba(255, 255, 255, 0.08)',
    borderHover: 'rgba(255, 255, 255, 0.15)',
  },
  fonts: {
    display: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  typography: {
    h1: { size: 'clamp(3rem, 8vw, 5rem)', weight: 700, lineHeight: 1.1, letterSpacing: '-0.03em' },
    h2: { size: 'clamp(1.5rem, 3vw, 2rem)', weight: 600, lineHeight: 1.2 },
    body: { size: '1.125rem', weight: 400, lineHeight: 1.6 },
    small: { size: '0.875rem', weight: 400, lineHeight: 1.5 },
  },
  space: [4, 8, 12, 16, 24, 32, 48, 72, 96], // px
  zIndex: { background: -1, content: 1, nav: 100 },
  layout: { maxWidth: '1200px', maxWidthWide: '1320px' },
  motion: { duration: '250ms', easing: 'cubic-bezier(0.33, 0, 0.2, 1)' },
  radius: { sm: '4px', md: '8px' },
};
