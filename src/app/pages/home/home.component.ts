// src/app/pages/home/home.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="page">
      <h1>Välkommen till min webbplats</h1>
      <p>Detta är startsidan för min Angular-applikation.</p>
    </div>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {}