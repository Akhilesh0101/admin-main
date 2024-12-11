import { Component, OnInit } from '@angular/core';
import { HealthTip, HealthTipsService } from '../admin-services/health-tips.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-health-tips',
  templateUrl: './admin-health-tips.component.html',
  imports:[CommonModule]

})
export class AdminHealthTipsComponent implements OnInit {
  healthTips: HealthTip[] = [];

  constructor(private healthTipsService: HealthTipsService) { }

  ngOnInit(): void {
    this.loadHealthTips();
  }

  // Load all health tips from the API
  loadHealthTips() {
    this.healthTipsService.getHealthTips().subscribe(
      (data: HealthTip[]) => {
        this.healthTips = data;
        console.log('Fetched health tips:', data);
      },
      (error) => {
        console.error('Error fetching health tips:', error);
      }
    );
  }

  // Add a new health tip
  onAddHealthTip() {
    // Prompt the user for health tip details (can be replaced by form inputs)
    const tipTitle = prompt('Enter health tip title:', 'New Health Tip');
    const tipDescription = prompt('Enter health tip description:', 'Description of the new health tip');
    const healthTipsImage = prompt('Enter image URL for the health tip:', '');
    const categoryId = prompt('Enter category ID (number):', '1'); // Default category ID is 1
    const createdByAdminId = prompt('Enter Admin ID (number):', '1'); // Default admin ID is 1
    
    // Validate inputs before proceeding
    if (tipTitle && tipDescription && healthTipsImage && categoryId && createdByAdminId) {
      // Create a new HealthTip object
      const newHealthTip: HealthTip = {
        TipId: 0,  // Backend will assign this ID
        TipTitle: tipTitle,
        TipDescription: tipDescription,
        HealthTipsimg: healthTipsImage,
        CategoryId: parseInt(categoryId, 10), // Ensure category ID is a number
        CreatedByAdminId: parseInt(createdByAdminId, 10) // Ensure Admin ID is a number
      };
  
      // Call the service to add the new health tip
      this.healthTipsService.addHealthTip(newHealthTip).subscribe(
        (healthTip) => {
          this.healthTips.push(healthTip);  // Add the new health tip to the list
          console.log('Added new health tip:', healthTip);
        },
        (error) => {
          console.error('Error adding health tip:', error);
        }
      );
    } else {
      console.error('Please fill in all fields.');
    }
  }
  

  // Edit an existing health tip
  onEditHealthTip(healthTip: HealthTip) {
    // Prompt for each field to be updated
    const updatedTitle = prompt('Enter new health tip title:', healthTip.TipTitle);
    const updatedDescription = prompt('Enter new description:', healthTip.TipDescription);
    const updatedImage = prompt('Enter new image URL:', healthTip.HealthTipsimg);
    const updatedCategory = prompt('Enter new category ID:', healthTip.CategoryId.toString());
  
    // Check if both title and description are provided before proceeding
    if (updatedTitle && updatedDescription && updatedImage && updatedCategory) {
      // Construct the updated health tip object
      const updatedHealthTip: HealthTip = {
        ...healthTip,  // Keep existing values for fields that aren't being updated
        TipTitle: updatedTitle,  // Update title
        TipDescription: updatedDescription,  // Update description
        HealthTipsimg: updatedImage,  // Update image URL
        CategoryId: parseInt(updatedCategory)  // Update category ID (parse it to number)
      };
  
      // Call the service to update the health tip in the backend
      this.healthTipsService.updateHealthTip(healthTip.TipId, updatedHealthTip).subscribe(
        () => {
          // Find the updated health tip in the current list and update it
          const index = this.healthTips.findIndex(t => t.TipId === healthTip.TipId);
          if (index !== -1) {
            this.healthTips[index] = updatedHealthTip;  // Update the health tip in the list
          }
        },
        (error) => {
          console.error('Error updating health tip:', error);  // Log error if any
        }
      );
    } else {
      // Log error if required fields are not provided
      console.error('Please provide all the required fields (Title, Description, Image, and Category).');
    }
  }
  

  // Delete a health tip
  onDeleteHealthTip(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this health tip?');
    if (confirmDelete) {
      this.healthTipsService.deleteHealthTip(id).subscribe(
        () => {
          this.healthTips = this.healthTips.filter(t => t.TipId !== id);
        },
        (error) => {
          console.error('Error deleting health tip:', error);
        }
      );
    }
  }
}
