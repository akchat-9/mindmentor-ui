import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FeedbackViewModel } from '../ViewModel/FeedbackViewModel';
import { feedbacks } from '../FakeDb/feedbacks';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor() { }

  getAllFeedbacks(): Observable<FeedbackViewModel[]> {
    return of(feedbacks)
  }
}
