import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-contactadmin',
  templateUrl: './contactadmin.component.html',
  styleUrls: ['./contactadmin.component.css']
})
export class ContactadminComponent {
  users: any[] = [];
  contact: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchcontact();
  }

  fetchcontact() {
    this.http.get<any>('http://localhost:3000/getcontact').subscribe(
      (response) => {
        const filteredUsers = response.data.filter((user: any) => !(user.email === 'admin@gmail.com' && user.password === 'adminadmin'));
        this.users = filteredUsers.map((user: any) => ({ ...user, editMode: false }));
      },
      (error) => {
        console.log('Error fetching users:', error);
      }
    );
  }
  
  updateuser(contactId: string) {
    const contact = this.users.find((u: any) => u.id === contactId);
    if (contact) {
      const updatedContact = {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        subject: contact.subject,
        message: contact.message
      };

      this.http.put(`http://localhost:3000/api/contact-update/${contactId}`, updatedContact).subscribe({
        next: () => {
          console.log('Contact updated successfully.');
          this.fetchcontact(); // Refresh the contact list
        },
        error: (error) => {
          console.log('Error updating contact:', error);
        }
      });
    }
  }

  toggledropMode(id: string) {
    if (confirm("Are you sure you want to delete this contact?")) {
      this.http.delete(`http://localhost:3000/api/contact_delete/${id}`).subscribe({
        next: () => {
          this.fetchcontact(); 
          console.log('Contact deleted successfully.');
        },
        error: (error) => {
          console.log('Error deleting contact:', error);
        }
      });
    }
  }
  

  toggleEditMode(user: any) {
    user.editMode = !user.editMode;
  }

}
