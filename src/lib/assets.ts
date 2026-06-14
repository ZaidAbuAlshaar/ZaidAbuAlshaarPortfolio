/**
 * Prepend Vite's BASE_URL to a public asset path.
 * In dev this is "/", on GitHub Pages it becomes "/ZaidAbuAlshaarPortfolio/".
 */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}
