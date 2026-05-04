import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../service/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({});
  emailSent: boolean | null = null;  // Variable to track if the email was sent successfully

  constructor(private formBuilder: FormBuilder, private contact: ContactService) { }

  ngOnInit() {
    // Initialize the form with your form controls and validations
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Get the form values
      const formData = this.userForm.value;

      // Use the ContactService's signup method to post the form data
      this.contact.signup(formData).subscribe(
        (response) => {
          // Handle the response from the server if needed
          console.log('Form data successfully submitted:', response);
          this.emailSent = true; // Set the flag to true since email was successfully sent
        },
        (error) => {
          // Handle any errors that occur during the HTTP request
          console.error('Error submitting form data:', error);
          this.emailSent = false; // Set the flag to false since there was an error sending the email
        }
      );
    } else {
      // If the form is not valid, mark all form controls as touched to show validation errors
      this.markFormGroupTouched(this.userForm);
    }
  }

  // Helper function to mark all form controls as touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}


