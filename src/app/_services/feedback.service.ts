import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeedbackViewModel } from '../ViewModel/FeedbackViewModel';
import { feedbacks } from '../FakeDb/feedbacks';
import { FeedbackModel } from '../model/FeedbackModel';
import { ApiResponse } from '../model/ApiResponseModel';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:5000/api/feedback/'

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  organisationId: number = 1;

  getAllFeedbacks(): Observable<ApiResponse<FeedbackViewModel[]>> {
    // return of(feedbacks)
    return this.http.get<ApiResponse<FeedbackViewModel[]>>(API_URL + `getAllByOrg/${this.organisationId}`);
  }

  saveFeedback(feedback: FeedbackModel): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(API_URL + 'create', feedback)
  }
}
