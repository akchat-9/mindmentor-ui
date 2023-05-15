import { Injectable } from '@angular/core';
import { CoursesSelectData } from '../FakeDb/CoursesSelectData';
import { instructors } from '../FakeDb/teachers';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UsersDDLViewModel } from '../ViewModel/UsersDDLViewModel';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getAllCourses(): Observable<any[]> {
    return of(CoursesSelectData);
  }

  getAllInstrutors(): Observable<UsersDDLViewModel[]> {
    return of(instructors);
  }
}
