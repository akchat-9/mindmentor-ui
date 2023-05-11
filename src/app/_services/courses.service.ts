import { Injectable } from '@angular/core'; 
import { courses } from '../FakeDb/courses'; 
import { Observable, of } from 'rxjs'; 
import { CoursesViewModel } from '../ViewModel/CoursesViewModel'; 
 
@Injectable({ 
  providedIn: 'root', 
}) 
export class CoursesService { 
  private staticCourses: CoursesViewModel[] = courses; 
 
  getUsers(): Observable<CoursesViewModel[]> { 
    return of(this.staticCourses); 
  } 
 
  getCoursesById(courseId: number): CoursesViewModel | null { 
    return this.staticCourses.find((c) => c.id == courseId) || null; 
  } 
}
