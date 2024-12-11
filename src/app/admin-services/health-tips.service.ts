import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the HealthTip interface
export interface HealthTip {
  TipId: number;
  TipTitle: string;
  TipDescription: string;
  HealthTipsimg: string;
  CategoryId: number;
  CreatedByAdminId: number;
}

@Injectable({
  providedIn: 'root'
})
export class HealthTipsService {
  private apiUrl = 'https://localhost:44348/api/HealthTips';  // Replace with your actual backend URL

  constructor(private http: HttpClient) { }

  // Get all health tips
  getHealthTips(): Observable<HealthTip[]> {
    return this.http.get<HealthTip[]>(this.apiUrl);
  }

  // Add a new health tip
  addHealthTip(healthTip: HealthTip): Observable<HealthTip> {
    return this.http.post<HealthTip>(this.apiUrl, healthTip);
  }

  // Update an existing health tip
  updateHealthTip(id: number, healthTip: HealthTip): Observable<HealthTip> {
    return this.http.put<HealthTip>(`${this.apiUrl}/${id}`, healthTip);
  }

  // Delete a health tip
  deleteHealthTip(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
