import { Routes } from '@angular/router';

// Define application routes
export const routes: Routes = [
  {
    path: '', // Root path
    redirectTo: 'home', // Redirect to 'home' if the path is empty
    pathMatch: 'full', // Ensure the full path is matched before redirecting
  },
  {
    path: 'home', // Route for the home page
    loadComponent: () =>
      import('./pages/blog/blog.component').then((m) => m.BlogComponent), // Lazy load the BlogComponent for the home page
  },
  {
    path: 'blog/:id', // Dynamic route for individual blog post details
    loadComponent: () =>
      import('./pages/blog-post-detail/blog-post-detail.component').then(
        (m) => m.BlogPostDetailComponent // Lazy load BlogPostDetailComponent
      ),
  },
  {
    path: 'about', // Route for the about page
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent), // Lazy load the AboutComponent
  },
  {
    path: '**', // Wildcard route for handling undefined paths
    redirectTo: 'home', // Redirect undefined paths to 'home'
  },
];
