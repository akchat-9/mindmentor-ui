import { Injectable } from '@angular/core';
import { courses } from '../FakeDb/courses';
import { Observable, catchError, of, throwError } from 'rxjs';
import { CoursesViewModel } from '../ViewModel/CoursesViewModel';
import { categories } from '../FakeDb/categories';
import { CategoryViewModel } from '../ViewModel/CategoryViewModel';
import { CourseModel } from '../model/CourseModel';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private staticCourses: CoursesViewModel[] = courses;

  constructor(private http: HttpClient) {}
  getUsers(): Observable<CoursesViewModel[]> {
    return of(this.staticCourses);
  }

  private handleResponse(response: HttpResponse<any>): any {
    console.log('API call successful');
    console.log(response.body); // Response body
    return response.body; // Return the validated response data to the component
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log('API call error');
    return throwError(() => error);
  }

  // getCoursesById(courseId: number): CourseModel | null {
  //   return this.staticCourses.find((c) => c.id == courseId) || null;
  // }

  getAllCategories(): Observable<CategoryViewModel[]> {
    return of(categories);
  }

  saveCourse(courseDetails: CourseModel): Observable<any> {
    console.log('CourseDetails::', courseDetails);
    return this.http
      .post<any>(
        'http://localhost:5000/api/course/create?organisationId=1&courseCategoryId=1&instructorIds=1',
        courseDetails,
        { observe: 'response' }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
}
