import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:3000/login'; // Replace this with your backend API URL

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    const loginData = { email, password };
    return this.http.post<any>(this.apiUrl, loginData)
      .pipe(
        map(response => {
          if (response.user) {
            if (response.user.email === 'admin@gmail.com' && response.user.password === 'adminadmin') {
              this.router.navigate(['/adminusers']); // Redirect to dashboard for admin
            } else {
              this.router.navigate(['/home']); // Redirect to home for regular users
            }
          } else {
            alert('Email not found.'); // Show alert for wrong credentials
          }
        }),
        catchError(error => {
          console.error('Login error: ', error);
          return throwError('Login failed.'); // Handle errors
        })
      );
  }
}
