import { Injectable } from '@angular/core';
import { CoursesSelectData } from '../FakeDb/CoursesSelectData';
import { instructors } from '../FakeDb/teachers';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { UsersDDLViewModel } from '../ViewModel/UsersDDLViewModel';
import { StateDDLViewModel } from '../ViewModel/StateDDLViewModel';
import { states } from '../FakeDb/states';
import { cities } from '../FakeDb/city';
@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor() {}

  getAllCourses(): Observable<any[]> {
    return of(CoursesSelectData);
  }

  getAllInstructors(): Observable<UsersDDLViewModel[]> {
    return of(instructors);
  }

  getStates(): Observable<StateDDLViewModel[]> {
    return of(states);
  }
  getCity(): Observable<StateDDLViewModel[]> {
    return of(cities);
  }
}
