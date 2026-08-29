/**
 * Brand palette — single source of truth for colour.
 *
 * Both `tailwind.config.ts` (className tokens) and server-side image
 * generation (the `opengraph-image` route files, which can't use Tailwind
 * classes) read from here. Re-skinning for a new client means editing
 * the seven values below and nowhere else. See AGENTS.md section 3.
 */
export const palette = {
  forest: '#1B2A3A', // deep navy — primary dark
  forestdeep: '#10192A', // midnight navy — footers, gradients
  gold: '#B8926A', // driftwood tan — accents on light
  goldbright: '#E8C88F', // sand gold — accents on dark (contrast-safe)
  parchment: '#F1EDE6', // sea salt white — primary light
  warmgrey: '#D9E2E1', // seafoam grey — alt bands, cards
  ink: '#22262B', // charcoal ink — text
} as const;

export type PaletteToken = keyof typeof palette;
