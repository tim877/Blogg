import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isHomePage = false; // Tracks if the current page is the home page
  isOwnerView = false; // Tracks whether the owner view is active
  isAboutPage = false; // Tracks if the current page is the about page

  constructor(
    private modalService: ModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // Subscribe to router events to check if the user is on the home page
    this.router.events
      .pipe(filter(() => this.router.url.includes('/home'))) // Check if the URL contains '/home'
      .subscribe(() => {
        this.isHomePage = true; // Mark as home page
        this.isAboutPage = false; // Ensure the about page flag is reset
      });

    // Subscribe to router events to check if the user is on the about page
    this.router.events
      .pipe(filter(() => this.router.url.includes('/about'))) // Check if the URL contains '/about'
      .subscribe(() => {
        this.isAboutPage = true; // Mark as about page
        this.isHomePage = false; // Ensure the home page flag is reset
      });

    // Handle other pages that are not home or about
    this.router.events
      .pipe(
        filter(
          () =>
            !this.router.url.includes('/home') &&
            !this.router.url.includes('/about')
        )
      )
      .subscribe(() => {
        this.isHomePage = false; // Reset home page flag
        this.isAboutPage = false; // Reset about page flag
      });
  }

  // Toggles between user view and owner view
  toggleView() {
    this.isOwnerView = !this.isOwnerView; // Switch the view mode
  }

  // Opens the modal for creating a new post
  openCreatePostModal() {
    this.modalService.toggleModal(true); // Trigger the modal visibility to open
  }
}
