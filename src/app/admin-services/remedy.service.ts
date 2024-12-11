import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Remedy interface
export interface Remedy {
  RemedyId: number;
  RemedyName: string;
  Remediesimg: string;
  Description: string;
  Benefits: string;
  PreparationMethod: string;
  UsageInstructions: string;
  CategoryId: number;
  CreatedByAdminId: number;
}

@Injectable({
  providedIn: 'root'
})
export class RemedyService {
  private apiUrl = 'https://localhost:44348/api/Remedies';  // Change this to your actual API URL

  constructor(private http: HttpClient) { }

  // Get all remedies
  getRemedies(): Observable<Remedy[]> {
    return this.http.get<Remedy[]>(this.apiUrl);
  }

  // Add a new remedy
  addRemedy(remedy: Remedy): Observable<Remedy> {
    return this.http.post<Remedy>(this.apiUrl, remedy);
  }

  // Update an existing remedy
  updateRemedy(id: number, remedy: Remedy): Observable<Remedy> {
    return this.http.put<Remedy>(`${this.apiUrl}/${id}`, remedy);
  }

  // Delete a remedy
  deleteRemedy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
