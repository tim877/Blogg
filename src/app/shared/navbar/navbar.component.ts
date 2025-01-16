// src/app/shared/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">My Website</div>
      <div class="nav-links">
        <a routerLink="/home" routerLinkActive="active">Home</a>
        <a routerLink="/blog" routerLinkActive="active">Blog</a>
        <a routerLink="/about" routerLinkActive="active">About Me</a>

        <button (click)="toggleView()">
          {{ isOwnerView ? 'Switch to User View' : 'Switch to Owner View' }}
        </button>

        <button
          *ngIf="isBlogPage && isOwnerView"
          (click)="openCreatePostModal()"
        >
          Create New Post
        </button>
      </div>
    </nav>
  `,
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isBlogPage = false;
  isOwnerView = false;

  constructor(private modalService: ModalService, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(() => this.router.url.includes('/blog')))
      .subscribe(() => {
        this.isBlogPage = true;
      });

    this.router.events
      .pipe(filter(() => !this.router.url.includes('/blog')))
      .subscribe(() => {
        this.isBlogPage = false;
      });
  }

  toggleView() {
    this.isOwnerView = !this.isOwnerView;
  }

  openCreatePostModal() {
    this.modalService.toggleModal(true);
  }
}
