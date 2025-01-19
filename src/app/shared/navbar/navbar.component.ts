import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../../services/modal.service';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf and other directives
import { RouterLink, RouterLinkActive } from '@angular/router'; // Import RouterLink and RouterLinkActive

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], // Add the necessary imports for directives
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isHomePage = false; // Track if we are on the home page
  isOwnerView = false;
  isAboutPage = false; // Track if we are on the about page

  constructor(private modalService: ModalService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Check if we are on the home page
    this.router.events
      .pipe(filter(() => this.router.url.includes('/home')))
      .subscribe(() => {
        this.isHomePage = true; // Set to true if we are on the home page
        this.isAboutPage = false; // Set to false if we are not on the about page
      });

    // Check if we are on the about page using the ActivatedRoute
    this.router.events
      .pipe(filter(() => this.router.url.includes('/about')))
      .subscribe(() => {
        this.isAboutPage = true; // Set to true if we are on the about page
        this.isHomePage = false; // Set to false if we are on the home page
      });

    // Handle case for other pages (if applicable)
    this.router.events
      .pipe(filter(() => !this.router.url.includes('/home') && !this.router.url.includes('/about')))
      .subscribe(() => {
        this.isHomePage = false;
        this.isAboutPage = false;
      });
  }

  toggleView() {
    this.isOwnerView = !this.isOwnerView; // Toggle between user and owner view
  }

  openCreatePostModal() {
    this.modalService.toggleModal(true); // Open the modal for creating a post
  }
}
