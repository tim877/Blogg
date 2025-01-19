import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home', // Se till att omdirigera till home (som nu är blog)
    pathMatch: 'full',
  },
  {
    path: 'home', // Byter ut 'blog' mot 'home'
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogComponent), // Länka om till blog-sidan som home
  },
  {
    path: 'blog/:id', // Dynamisk route för blogginlägg
    loadComponent: () =>
      import('./pages/blog-post-detail/blog-post-detail.component').then(
        (m) => m.BlogPostDetailComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
