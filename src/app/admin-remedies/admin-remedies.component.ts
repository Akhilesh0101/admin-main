import { Component, OnInit } from '@angular/core';
import { Remedy, RemedyService } from '../admin-services/remedy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-remedies',
  templateUrl: './admin-remedies.component.html',
  imports:[CommonModule],
  styleUrls: ['./admin-remedies.component.css']
})
export class AdminRemediesComponent implements OnInit {
  remedies: Remedy[] = [];

  constructor(private remedyService: RemedyService) { }

  ngOnInit(): void {
    this.loadRemedies();
  }

  // Load all remedies from API
  loadRemedies() {
    this.remedyService.getRemedies().subscribe(
      (data: Remedy[]) => {
        this.remedies = data;
        console.log('Fetched remedies:', data);
      },
      (error) => {
        console.error('Error fetching remedies:', error);
      }
    );
  }

  // Add new remedy
  onAddRemedy() {
    // Prompt the user for the remedy details (can be replaced by form inputs)
    const remedyName = prompt('Enter remedy name:', 'New Remedy');
    const remedyImage = prompt('Enter remedy image URL:', '');
    const description = prompt('Enter remedy description:', 'Description of new remedy');
    const benefits = prompt('Enter remedy benefits:', '');
    const preparationMethod = prompt('Enter preparation method:', '');
    const usageInstructions = prompt('Enter usage instructions:', '');
    const categoryId = prompt('Enter category ID (number):', '1'); // Default category ID is 1
    const createdByAdminId = prompt('Enter Admin ID (number):', '1'); // Default admin ID is 1
    
    // Validate inputs before proceeding
    if (remedyName && remedyImage && description && benefits && preparationMethod && usageInstructions && categoryId && createdByAdminId) {
      // Create a new Remedy object
      const newRemedy: Remedy = {
        RemedyId: 0,  // Backend will assign this ID
        RemedyName: remedyName,
        Remediesimg: remedyImage,
        Description: description,
        Benefits: benefits,
        PreparationMethod: preparationMethod,
        UsageInstructions: usageInstructions,
        CategoryId: parseInt(categoryId, 10), // Ensure category ID is a number
        CreatedByAdminId: parseInt(createdByAdminId, 10) // Ensure Admin ID is a number
      };
  
      // Call the service to add the new remedy
      this.remedyService.addRemedy(newRemedy).subscribe(
        (remedy) => {
          this.remedies.push(remedy);  // Add the new remedy to the list
          console.log('Added new remedy:', remedy);
        },
        (error) => {
          console.error('Error adding remedy:', error);
        }
      );
    } else {
      console.error('Please fill in all fields.');
    }
  }
  
  // Edit a remedy
  onEditRemedy(remedy: Remedy) {
    // Prompt for each field to be updated
    const updatedName = prompt('Enter new remedy name:', remedy.RemedyName);
    const updatedImage = prompt('Enter new remedy image URL:', remedy.Remediesimg);
    const updatedDescription = prompt('Enter new description:', remedy.Description);
    const updatedBenefits = prompt('Enter new benefits:', remedy.Benefits);
    const updatedPreparationMethod = prompt('Enter new preparation method:', remedy.PreparationMethod);
    const updatedUsageInstructions = prompt('Enter new usage instructions:', remedy.UsageInstructions);
  
    // Ensure all required fields have values
    if (updatedName && updatedDescription) {
      // Create the updated remedy object with the new values
      const updatedRemedy: Remedy = {
        RemedyId: remedy.RemedyId, // Keep the existing RemedyId
        RemedyName: updatedName,
        Remediesimg: updatedImage || remedy.Remediesimg, // If no new image, keep the old one
        Description: updatedDescription,
        Benefits: updatedBenefits || remedy.Benefits, // If no new benefits, keep the old ones
        PreparationMethod: updatedPreparationMethod || remedy.PreparationMethod, // If no new method, keep the old one
        UsageInstructions: updatedUsageInstructions || remedy.UsageInstructions,
        CategoryId: remedy.CategoryId, // Keep the existing CategoryId if not changing
        CreatedByAdminId: remedy.CreatedByAdminId // Keep the existing admin ID
      };
  
      // Call the update service to send the updated remedy to the backend
      this.remedyService.updateRemedy(remedy.RemedyId, updatedRemedy).subscribe(
        () => {
          // Find the remedy in the current list and update it
          const index = this.remedies.findIndex(r => r.RemedyId === remedy.RemedyId);
          if (index !== -1) {
            this.remedies[index] = updatedRemedy;  // Update the remedy in the list
          }
        },
        (error) => {
          console.error('Error updating remedy:', error);
        }
      );
    } else {
      console.error('Please provide both the remedy name and description.');
    }
  }
  
  

  // Delete a remedy
  onDeleteRemedy(id: number) {
    const confirmDelete = confirm('Are you sure you want to delete this remedy?');
    if (confirmDelete) {
      this.remedyService.deleteRemedy(id).subscribe(
        () => {
          this.remedies = this.remedies.filter(r => r.RemedyId !== id);
        },
        (error) => {
          console.error('Error deleting remedy:', error);
        }
      );
    }
  }
}
