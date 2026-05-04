import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css'],
})
export class AdminusersComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any>('http://localhost:3000/getusers').subscribe(
      (response) => {
        const filteredUsers = response.data.filter(
          (user: any) =>
            !(
              user.email === 'admin@gmail.com' && user.password === 'adminadmin'
            )
        );
        this.users = filteredUsers.map((user: any) => ({
          ...user,
          editMode: false,
        }));
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }

  updateuser1(user: any) {
    user.editMode = !user.editMode;
  }

  updateuser(id: string) {
    // Find the user with the given id
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      console.error(`User with ID ${id} not found`);
      return;
    }

    // Log the user data being sent
    console.log('Updating user with data:', user);

    this.http
      .put(`http://localhost:3000/api/user_update/${id}`, user)
      .subscribe({
        next: () => {
          console.log('User updated successfully.');
        },
        error: (error) => {
          console.log('Error updating user:', error);
        },
      });
  }

  toggleDropMode(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http
        .delete(`http://localhost:3000/api/user_delete/${id}`)
        .subscribe({
          next: () => {
            console.log('User deleted successfully.');
            this.users = this.users.filter((user) => user.id !== id);
          },
          error: (error) => {
            console.log('Error deleting user:', error);
          },
        });
    }
  }

  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
