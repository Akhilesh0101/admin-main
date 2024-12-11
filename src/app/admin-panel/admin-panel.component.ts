import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  // Sample data
  totalProduct = 40;
  totalRemedies = 40;
  totalHealthTips = 40;
  totalUsers = 5;
  totalAdmins = 1;

  // Event handlers for buttons


  onRemediesClick() {
    console.log('Navigating to Remedies page...');
  }

  onHealthTipsClick() {
    console.log('Navigating to Health Tips page...');
  }

  onUserDetailsClick() {
    console.log('Navigating to User Details page...');
  }

  onCreateAdminClick() {
    console.log('Navigating to Create Admin page...');
  }
}
