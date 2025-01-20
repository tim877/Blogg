import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <!-- Navigation bar rendered at the top -->
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `, // Inline template instead of external HTML file
})
export class AppComponent {}
