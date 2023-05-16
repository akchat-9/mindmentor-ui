import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssignmentViewModel } from '../ViewModel/AssignmentViewModel';
import { assignment } from '../FakeDb/assignment';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private assignmentList: AssignmentViewModel[] = assignment;
  constructor() {}

  getAssignemnt(): Observable<AssignmentViewModel[]> {
    return of(this.assignmentList);
  }

  getAssignmentById(assignmentId: number): AssignmentViewModel | null {
    return (
      this.assignmentList.find(
        (assignment) => assignment.id == assignmentId
      ) || null
    );
  }
}
