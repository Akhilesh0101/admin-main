import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  imports:[CommonModule],
  styleUrls: ['./admin-management.component.css'],
})
export class AdminManagementComponent {
  // Dummy data for admins
  admins = [
    { AdminID: 1, Username: 'admin1', Email: 'admin1@example.com' },
    { AdminID: 2, Username: 'admin2', Email: 'admin2@example.com' },
  ];

  // Add a new admin
  onCreateAdmin() {
    const newAdmin = {
      AdminID: this.admins.length + 1,
      Username: prompt('Enter username:') || '',
      Email: prompt('Enter email:') || '',
    };

    if (newAdmin.Username && newAdmin.Email) {
      this.admins.push(newAdmin);
      console.log('New admin created:', newAdmin);
    } else {
      alert('Username and Email are required to create a new admin.');
    }
  }

  // Delete an admin
  onDeleteAdmin(adminID: number) {
    this.admins = this.admins.filter((admin) => admin.AdminID !== adminID);
    console.log('Deleted admin with ID:', adminID);
  }
}
