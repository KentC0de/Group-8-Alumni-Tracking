import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'login', renderMode: RenderMode.Client },
  { path: 'forgot-password', renderMode: RenderMode.Client },

  // keep fallback last
  { path: '**', renderMode: RenderMode.Prerender },
];