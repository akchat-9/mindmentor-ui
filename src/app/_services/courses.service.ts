import { Injectable } from '@angular/core';
import { courses } from '../FakeDb/courses';
import { Observable, of } from 'rxjs';
import { CoursesViewModel } from '../ViewModel/CoursesViewModel';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  getUsers(): Observable<CoursesViewModel[]> {
    return of(courses);
  }
}
