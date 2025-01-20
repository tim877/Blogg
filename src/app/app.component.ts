import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Enables routing and view rendering
import { NavbarComponent } from './shared/navbar/navbar.component'; // Navigation bar component

@Component({
  selector: 'app-root', // Root component selector
  standalone: true, // Marks the component as standalone
  imports: [RouterOutlet, NavbarComponent], // Includes RouterOutlet for routing and NavbarComponent for navigation
  template: `
    <app-navbar></app-navbar>
    <!-- Navigation bar rendered at the top -->
    <main class="container">
      <router-outlet></router-outlet>
      <!-- Placeholder for routed views -->
    </main>
  `, // Inline template instead of external HTML file
})
export class AppComponent {}
