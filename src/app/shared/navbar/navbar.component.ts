// src/app/shared/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar">
      <div class="nav-brand">Min Webbplats</div>
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active">Hem</a>
        <a routerLink="/blog" routerLinkActive="active">Blogg</a>
        <a routerLink="/about" routerLinkActive="active">Om mig</a>
        <button (click)="openCreatePostModal()">Skapa nytt inlägg</button>
      </div>
    </nav>
  `,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private modalService: ModalService) {}

  openCreatePostModal() {
    this.modalService.toggleModal(true);  // Skickar signal om att visa modal
  }
}
