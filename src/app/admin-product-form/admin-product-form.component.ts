import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../admin-services/product.service'; // Adjust the import path
import { Product } from '../admin-services/product.service'; // Import the Product interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],  // Import CommonModule to avoid issues in Angular components
  styleUrls: ['./admin-product-form.component.css']
})
export class AdminProductFormComponent implements OnInit {
  productForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = null; // To hold image preview
  isEditMode: boolean = false; // Flag to determine if we are editing or adding a product
  productId: number | null = null; // Product ID (used for editing)

  constructor(
    private fb: FormBuilder,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initializeForm();

    // Example logic to handle edit mode: 
    // If a product ID is passed (e.g., from the router), fetch the product to populate the form
    if (this.productId) {
      this.isEditMode = true;
      this.fetchProductForEdit(this.productId);
    }
  }

  // Initialize the form
  initializeForm() {
    this.productForm = this.fb.group({
      ProductName: ['', Validators.required],
      Productimg: [null, Validators.required], // Form control for the file input
      Description: ['', Validators.required],
      Price: ['', [Validators.required, Validators.min(0)]],
      StockQuantity: ['', [Validators.required, Validators.min(0)]],
      CategoryId: ['', [Validators.required, Validators.min(1)]],
      CreatedByAdminId: ['1'] // Default admin ID
    });
  }

  // Fetch product data for edit (e.g., from an API)
  fetchProductForEdit(productId: number) {
    this.productService.getProductById(productId).subscribe(product => {
      // Populate the form with the existing product data
      this.productForm.patchValue({
        ProductName: product.ProductName,
        Description: product.Description,
        Price: product.Price,
        StockQuantity: product.StockQuantity,
        CategoryId: product.CategoryId,
        CreatedByAdminId: product.CreatedByAdminId
      });

      // Set the preview image (if available)
      this.selectedImage = product.Productimg;
    });
  }

  // Handle file input change
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];

      // Create an image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Store the preview
      };
      reader.readAsDataURL(file);

      // Optionally, you could store the file in the form control here, but do it manually using FormData
      // Since we are handling the file upload via FormData during submit, we don't patch it here directly
    }
  }

  // Submit the form (add/edit product)
  onSubmit() {
    if (this.productForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    const formValues = this.productForm.value;

    // Create FormData to include the file with other form fields
    const formData = new FormData();
    formData.append('ProductName', formValues.ProductName);
    formData.append('Description', formValues.Description);
    formData.append('Price', formValues.Price);
    formData.append('StockQuantity', formValues.StockQuantity);
    formData.append('CategoryId', formValues.CategoryId);
    formData.append('CreatedByAdminId', formValues.CreatedByAdminId);

    // If a file is selected, append it to the formData
    if (formValues.Productimg instanceof File) {
      formData.append('Productimg', formValues.Productimg, formValues.Productimg.name);
    }

    // Check if it's an edit or add operation
    if (this.isEditMode && this.productId) {
      // Update the product using productId
      this.productService.updateProduct(this.productId, formData).subscribe(response => {
        console.log('Product updated successfully', response);
      });
    } else {
      // Add new product
      this.productService.addProduct(formData).subscribe(response => {
        console.log('Product added successfully', response);
      });
    }
  }
}
