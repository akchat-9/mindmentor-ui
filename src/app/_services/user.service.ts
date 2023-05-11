import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Menu } from '../model/MenuModel';
import { UserViewModel } from '../ViewModel/UsersViewModel';
import { users } from '../FakeDb/Users';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  getMenuByRole(role: string) {
    return this.http.get<Menu[]>(`http://localhost:8080/menu/${role}`);
  }

  getUsers(): Observable<UserViewModel[]> {
    return of(users);
  }

  getUsersById(userId: number): UserViewModel | null {
    return users.find((u) => (u.id = userId)) || null;
  }
}
