import { Injectable } from '@angular/core';
import { courses } from '../FakeDb/courses';
import { Observable, catchError, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { CourseListViewModel } from '../ViewModel/CourseListViewModel';
import { categories } from '../FakeDb/categories';
import { CategoryViewModel } from '../ViewModel/CategoryViewModel';
import { CourseModel } from '../model/CourseModel';
import { CourseApiModel } from '../model/CourseApiModel';
import * as moment from 'moment';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { ApiResponse } from '../model/ApiResponseModel';
import { CategoryCountViewModel } from '../ViewModel/CategoryCountViewModel';
import { CourseViewModel } from '../ViewModel/CourseViewModel';

@Injectable({
  providedIn: 'root',
})


export class CoursesService {
  // private staticCourses: CoursesViewModel[] = courses;

  API_URL: string = 'http://localhost:5000/api/course/'

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }),
  // };

  constructor(private http: HttpClient) { }
  // getUsers(): Observable<CoursesViewModel[]> {
  //   return of(this.staticCourses);
  // }

  getCourseList(organisationId: number): Observable<ApiResponse<CourseListViewModel[]>> {
    return this.http.get<ApiResponse<CourseListViewModel[]>>(this.API_URL + `getCourseList/all/${organisationId}`);
  }

  getCourseById(courseId: number): Observable<ApiResponse<CourseViewModel>> {
    return this.http.get<ApiResponse<CourseViewModel>>(this.API_URL + `getCourseDetails/${courseId}`);
  }

  getAllCategories(): Observable<CategoryViewModel[]> {
    return of(categories);
  }

  saveCourse(courseDetails: CourseModel): Observable<any> {
    console.log('CourseDetails --- service', courseDetails)
    return this.http.post<any>(
      this.API_URL + 'create', courseDetails
    );
  }

  getCourseCategoriesAndCount(organisationId: number): Observable<ApiResponse<CategoryCountViewModel[]>> {
    return this.http.get<ApiResponse<CategoryCountViewModel[]>>(this.API_URL + `getCategoryAndCourseCount/all/${organisationId}`);
  }

  updateCourseDetails(courseDetails: CourseModel, courseId: number): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(this.API_URL + `update/${courseId}`, courseDetails)
  }

}
