import { Injectable } from '@angular/core';
import { CoursesSelectData } from '../FakeDb/CoursesSelectData';
import { instructors } from '../FakeDb/teachers';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UsersDDLViewModel } from '../ViewModel/UsersDDLViewModel';
import { StateDDLViewModel } from '../ViewModel/StateDDLViewModel';
import { states } from '../FakeDb/states';
import { cities } from '../FakeDb/city';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../model/ApiResponseModel';
import { CityDDLViewModel } from '../ViewModel/CityDDLViewModel';
import { CourseListViewModel } from '../ViewModel/CourseListViewModel';
import { CourseDDLViewModel } from '../ViewModel/CourseDDLViewModel';


const API_URL = 'http://localhost:5000/api/common/'
const USER_API_URL = 'http://localhost:5000/api/user/'
const COURSE_API_URL = 'http://localhost:5000/api/course/'

@Injectable({
  providedIn: 'root',
})

export class CommonService {
  constructor(private http: HttpClient) { }
  organisationId: number = 1;
  getAllCourses(): Observable<any[]> {
    return of(CoursesSelectData);
  }

  // getAllInstructors(): Observable<ApiResponse<UsersDDLViewModel[]>> {
  //   return this.http.get<ApiResponse<UsersDDLViewModel[]>>(API_URL + `getCourseList/all/${organisationId}`);    
  // }
  // getAllInstructors(): Observable<UsersDDLViewModel[]> {
  //   return of(instructors);
  // }
  getAllInstructors(): Observable<ApiResponse<UsersDDLViewModel[]>> {
    return this.http.get<ApiResponse<UsersDDLViewModel[]>>(USER_API_URL + 'getAllUserIdAndFirstNameAndLastName/1/2');
  }

  getStates(): Observable<ApiResponse<StateDDLViewModel[]>> {
    return this.http.get<ApiResponse<StateDDLViewModel[]>>(API_URL + 'getAllStates')
  }
  getCity(): Observable<ApiResponse<CityDDLViewModel[]>> {
    return this.http.get<ApiResponse<CityDDLViewModel[]>>(API_URL + 'getAllCities')
  }

  // getAllCourseList(organisationId: number): Observable<ApiResponse<CourseListViewModel[]>> {
  //   return this.http.get<ApiResponse<CourseListViewModel[]>>(API_URL + `getCourseList/all/${organisationId}`);
  // }
  getAllCourseList(instructorId: number): Observable<ApiResponse<CourseDDLViewModel[]>> {
    return this.http.get<ApiResponse<CourseDDLViewModel[]>>(COURSE_API_URL + `getAllCourseIdAndName/${instructorId}`)
  }

  // getInstructorList():Observable<ApiResponse<UsersDDLViewModel[]>>{
  //   return this.http.get<ApiResponse<UsersDDLViewModel[]>>()
  // }
}
