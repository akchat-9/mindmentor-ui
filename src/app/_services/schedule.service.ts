import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { sessions } from '../FakeDb/Sessions';
import { AllSessionsViewModel } from '../ViewModel/AllSessionsViewModel';
import { allsessions } from '../FakeDb/allsessions';
import { CoursesViewModel } from '../ViewModel/CoursesViewModel';
import { CoachingSessionModel } from '../model/CoachingSessionModel';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient) {}
  private staticSessions: CoachingSessionModel[] = allsessions;
  getSessions(): Observable<AllSessionsViewModel[]> {
    return of(allsessions);
  }

  getAllSessions(): Observable<AllSessionsViewModel[]> {
    return of(allsessions);
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
    console.log(sessionDetail);
  }

  addCoachingSession(sessionDetail: CoachingSessionModel) {
    console.log(sessionDetail);
  }
}
