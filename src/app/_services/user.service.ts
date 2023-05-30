import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Menu } from '../model/MenuModel';
import { UserViewModel } from '../ViewModel/UserViewModel';
import { users } from '../FakeDb/Users';
import { UserModel } from '../model/UserModel';
import { CourseListViewModel } from '../ViewModel/CourseListViewModel';
import { UserListViewModel } from '../ViewModel/UserListViewModel';
import { ApiResponse } from '../model/ApiResponseModel';
import { RoleAndUserCountViewModel } from '../ViewModel/RoleAndUserCountViewModel';

const API_URL = 'http://localhost:5000/api/user/';
const NODE_API_URL = 'http://localhost:8080/api/auth/signup'

// const httpOptions = {
//   // observe: 'response',
// };
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  // getUserBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }

  // getModeratorBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'mod', { responseType: 'text' });
  // }

  // getAdminBoard(): Observable<any> {
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }

  private handleResponse(response: HttpResponse<any>): any {
    console.log('API call successful');
    console.log(response.body); // Response body
    return response.body; // Return the validated response data to the component
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('API call error');
    return throwError(() => error);
  }

  // getUsers(): Observable<UserViewModel[]> {
  //   return of(users);
  // }

  // getUsersById(userId: number): UserViewModel | null {
  //   return users.find((u) => (u.id = userId)) || null;
  // }

  saveUserDetails(userDetails: UserModel): Observable<ApiResponse<string>> {
    const UserForNode = {
      username: userDetails.firstName,
      email: userDetails.emailAddress,
      password: userDetails.password,
      roles: [userDetails.role.toLowerCase()]
    }
    this.http.post(NODE_API_URL, UserForNode).subscribe(response => console.log('Node api signup response: ', response))
    return this.http.post<ApiResponse<string>>(API_URL + 'create', userDetails)
  }

  updateUserDetails(userDetails: UserModel, userId: number): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(API_URL + `update/${userId}`, userDetails)
  }

  getAllUsers(organisationId: number): Observable<ApiResponse<UserListViewModel[]>> {
    return this.http.get<ApiResponse<UserListViewModel[]>>(API_URL + `getUserList/all/${organisationId}`);
  }

  getUserById(userId: number): Observable<ApiResponse<UserViewModel>> {
    return this.http.get<ApiResponse<UserViewModel>>(API_URL + `getUserDetails/${userId}`);
  }

  getRoleAndUserCount(organisationId: number): Observable<ApiResponse<RoleAndUserCountViewModel[]>> {
    return this.http.get<ApiResponse<RoleAndUserCountViewModel[]>>(API_URL + `getRoleAndUserCount/all/${organisationId}`)
  }

  deleteUser(userId: number): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(API_URL + `delete/${userId}`)
  }
}
