import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductService } from '../admin-services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./admin-product.component.css'],
})
export class AdminProductComponent implements OnInit {
  products: Product[] = [];
  productForm: FormGroup;
  isEditMode: boolean = false;
  selectedProduct: Product | null = null;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Load all products from the API
  loadProducts() {
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        console.log('Fetched products:', data);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  // Navigate to product form to add a new product
  onAddProduct() {
    this.router.navigate(['/admin-product-form']);
  }

  // Navigate to the product form for editing an existing product
  onEditProduct(product: Product) {
    this.router.navigate(['/admin-product-form'], {
      queryParams: { id: product.ProductId },
    });
  }

  // Delete a product
  onDeleteProduct(productId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this product?');
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe(
        () => {
          this.products = this.products.filter((p) => p.ProductId !== productId);
        },
        (error) => {
          console.error('Error deleting product:', error);
        }
      );
    }
  }

  // Helper method to get image URL or base64 string
  getImageUrl(imagePath: string): string {
    // Check if the image is a base64 string
    if (imagePath.startsWith('data:image')) {
      return imagePath; // Return the base64 image
    }
    // Otherwise, assume it's a URL or filename and append the base URL
    return `https://localhost:44348/api/Product/3/image
`;  // Adjust this based on your backend configuration
  }
}
