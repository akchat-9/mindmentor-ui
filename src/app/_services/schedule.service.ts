import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sessions } from '../FakeDb/Sessions';
import { AllSessionsViewModel } from '../ViewModel/AllSessionsViewModel';
import { allsessions } from '../FakeDb/allsessions';
import { CourseListViewModel } from '../ViewModel/CourseListViewModel';
import { CoachingSessionModel } from '../model/CoachingSessionModel';
import { Menu } from '../model/MenuModel';
import { ApiResponse } from '../model/ApiResponseModel';
import { ScheduleModel } from '../model/ScheduleModel';
import { ScheduleViewModel } from '../ViewModel/ScheduleViewModel';


const API_URL = 'http://localhost:5000/api/schedule/'

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) { }
  private staticSessions: CoachingSessionModel[] = allsessions;
  getSessions(): Observable<AllSessionsViewModel[]> {
    return of(allsessions);
  }

  getAllSessions(organisationId: number): Observable<ApiResponse<ScheduleViewModel[]>> {
    return this.http.get<ApiResponse<ScheduleViewModel[]>>(API_URL + `sessions/all/${organisationId}`)
  }

  getCoachingSessionById(sessionId: number): CoachingSessionModel | null {
    const session = this.staticSessions.find((s) => s.id === sessionId);
    if (session != null) {
      return session;
    } else {
      return null;
    }
  }

  updateCoachingSession(sessionDetail: CoachingSessionModel) {
    // console.log(sessionDetail);
  }

  addCoachingSession(scheduleDetails: ScheduleModel): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(API_URL + 'create', scheduleDetails)
  }

  getMenuByRole(role: string) {
    return this.http.get<Menu[]>(`http://localhost:8080/menu/${role}`);
  }
}
