import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../service/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private service: SignupService) {}
  emailsent: boolean | null = null; 
  userForm = new FormGroup({  
    fullname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    mobilenumber: new FormControl('', Validators.required)
  });

  userSubmit() {
    if (this.userForm.invalid) {
      this.markFormGroupTouched(this.userForm);
      return;
    }

    this.service.signup(this.userForm.value).subscribe(
      (res) => {
        console.log(res, 'res=>');
        this.emailsent=true;
        // Optionally, you can navigate to a success page after successful signup
        // this.router.navigate(['/success']);
      },
      (error) => {
        console.log(error, 'error=>');
        this.emailsent=true;
        // Handle any errors during signup
      }
    );
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
