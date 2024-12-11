import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  UserId: number;
  UserName: string;
  Email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:44348/api/Users'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Method to get the list of users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Method to delete a user
 deleteUser(id: number): Observable<any> {
  const url = `https://localhost:44348/api/Users/${id}`;
  
  return this.http.delete(url);
}

}
