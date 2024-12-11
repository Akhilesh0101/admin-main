import { Component, OnInit } from '@angular/core';
import { AdminProfile, AdminService } from '../admin-services/admin.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {
  currentAdmin: AdminProfile = {
    AdminId: 0,
    Username: '',
    Email: '',
    Password: '',  // Password field
    HealthTips: [],
    Products: [],
    Remedies: [],
    Role: null,
    RoleId: 0
  };

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadAdminProfile();  // Load admin profile when the component is initialized
  }

  loadAdminProfile(): void {
    this.adminService.getAdminProfile().subscribe(
      (data) => {
        this.currentAdmin = data; 
     
      },
      (error) => {
        console.error('Error loading admin profile:', error);
      }
    );
  }

  saveProfile(): void {
    // Call the update API to save the profile (including password)
    this.adminService.updateAdminProfile(this.currentAdmin).subscribe(
      (response) => {
        console.log('Admin profile updated:', response);
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating admin profile:', error);
        alert('Error updating profile.');
      }
    );
  }

  // Function to handle password change, if necessary
  changePassword(newPassword: string): void {
    if (newPassword && newPassword.length >= 8) {
      this.currentAdmin.Password = newPassword;
      this.saveProfile();  // Save the updated profile
    } else {
      alert('Password must be at least 8 characters long');
    }
  }
}
