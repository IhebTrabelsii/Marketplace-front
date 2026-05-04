import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  apiUrl = 'http://localhost:3000/addUser';
  constructor(private http: HttpClient) {}

  signup(data:any): Observable<any>{
    console.log(data,'createapi=>')
      return this.http.post(`${this.apiUrl}`,data)
  }
  checkIdExists(id:string): Observable<boolean> {
    // Implement your logic to check if the ID already exists on the server
    // You can use HttpClient to make a request to the server to check the ID existence
    // Return an Observable<boolean> indicating if the ID exists (true) or not (false)
    // For example:
    return this.http.get<boolean>(`${this.apiUrl}/checkIdExists/${id}`);
  }
}
