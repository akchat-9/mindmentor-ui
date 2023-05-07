import { Injectable } from '@angular/core';
import { CoursesSelectData } from '../FakeDb/CoursesSelectData';
import { teachers } from '../FakeDb/teachers';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getAllCourses(): Observable<any[]> {
    return of(CoursesSelectData);
  }

  getAllTeachers(): Observable<any[]> {
    return of(teachers);
  }
}
