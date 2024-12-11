import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Product interface
export interface Product {
  ProductId: number;
  ProductName: string;
  Productimg: string; // This will be the URL of the uploaded image or the image identifier
  Price: number;
  Description: string;
  StockQuantity: number;
  CategoryId: number;
  CreatedByAdminId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Replace with your actual API endpoint
  private apiUrl = 'https://localhost:44348/api/Product';

  constructor(private http: HttpClient) { }

  // Method to fetch all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Method to add a product with FormData (for file upload)
  addProduct(productData: FormData): Observable<Product> {
    const apiUrlWithUpload = `https://localhost:44348/api/Product/upload`;  // Concatenate '/upload' to the base API URL
    console.log(productData)
    return this.http.post<Product>(apiUrlWithUpload, productData);
  }
  
  // Method to update a product with FormData (for file upload)
  updateProduct(id: number, productData: FormData): Observable<Product> {
    // Update should target a PUT endpoint for updating the product
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData);
  }

  // Method to delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Method to fetch a product by its ID (for editing)
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
