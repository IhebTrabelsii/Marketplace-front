import { Component } from '@angular/core';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  showAlert = false; 

  constructor(private loginService: LoginService) { }

  login() {
    this.loginService.login(this.email, this.password).subscribe(
      () => {
        this.showAlert = false; 
      },
      (error) => {
        this.showAlert = true; 
      }
    );
  }
}
