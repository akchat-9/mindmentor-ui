import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AssignmentViewModel } from '../ViewModel/AssignmentViewModel';
import { assignment } from '../FakeDb/assignment';
import { AssignmentModel } from '../model/AssignmentModel';
import { ApiResponse } from '../model/ApiResponseModel';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:5000/api/assignment/'
@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  // private assignmentList: AssignmentViewModel[] = assignment;
  constructor(private http: HttpClient) { }

  // getAssignemnt(): Observable<AssignmentViewModel[]> {
  //   return of(this.assignmentList);
  // }

  // getAssignmentById(assignmentId: number): AssignmentViewModel | null {
  //   return (
  //     this.assignmentList.find(
  //       (assignment) => assignment.id == assignmentId
  //     ) || null
  //   );
  // }

  saveAssignment(assignmentDetails: AssignmentModel): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(API_URL + 'create', assignmentDetails)
  }

  getAllAssignment(organisationId: number): Observable<ApiResponse<AssignmentViewModel[]>> {
    return this.http.get<ApiResponse<AssignmentViewModel[]>>(API_URL + `getAllAssignments/org/${organisationId}`)
  }
}
