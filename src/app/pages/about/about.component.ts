// src/app/pages/about/about.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="page">
      <h1>Om mig</h1>
      <div class="about-content">
        <p>Här kan du skriva lite om dig själv och dina intressen.</p>
      </div>
    </div>
  `,
  styleUrl: './about.component.scss'
})
export class AboutComponent {}