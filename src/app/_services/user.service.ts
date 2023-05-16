import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu } from '../model/MenuModel';
import { UsersViewModel } from '../ViewModel/UsersViewModel';
import { users } from '../FakeDb/Users';
import { UserModel } from '../model/UserModel';
import { CoursesViewModel } from '../ViewModel/CoursesViewModel';
import { UserViewModel } from '../ViewModel/UserViewModel';

const API_URL = 'http://localhost:5000/api';

// const httpOptions = {
//   // observe: 'response',
// };
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

  getUsers(): Observable<UsersViewModel[]> {
    return of(users);
  }

  getUsersById(userId: number): UsersViewModel | null {
    return users.find((u) => (u.id = userId)) || null;
  }

  SaveUserDetails(userModel: UserModel): string {
    // const headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    let message = '';
    this.http
      .post(API_URL + '/create', userModel, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          console.log(response.status);
          message = 'User created successfully';
        } else message = 'failed';
      });
    return message;
  }

  getAllUsers(): Observable<UserViewModel[]> {
    return this.http.get<UserViewModel[]>(API_URL + '/getall/list');
  }

  getUserById(id: number): Observable<UserViewModel> {
    return this.http.get<UserViewModel>(API_URL + `get/${id}`);
  }
}
