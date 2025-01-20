import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  contactForm: FormGroup;

  // Regex for validating email format (e.g., text@text.text)
  private emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

  constructor(private fb: FormBuilder) {
    // Initialize the contact form with validation rules
    this.contactForm = this.fb.group({
      name: ['', Validators.required], // Name field is required
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]], // Email field is required and must match regex
      message: ['', Validators.required], // Message field is required
    });
  }

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {}

  // Handles form submission
  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value); // Log form data to the console
      this.contactForm.reset(); // Reset the form fields
      alert('Your message has been sent!'); // Display a success message
    }
  }
}
