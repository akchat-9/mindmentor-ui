import { Component } from '@angular/core';
import { FeedbackViewModel } from 'src/app/ViewModel/FeedbackViewModel';
import { FeedbackService } from 'src/app/_services/feedback.service';


@Component({
  selector: 'app-view-feedback',
  templateUrl: './view-feedback.component.html',
  styleUrls: ['./view-feedback.component.css']
})
export class ViewFeedbackComponent {

  feedbackList!: FeedbackViewModel[];
  sortDirection: 'asc' | 'desc' = 'asc';
  constructor(private feedbackService: FeedbackService) { }
  ngOnInit() {
    this.getAllFeedback();
  }
  getAllFeedback() {
    this.feedbackService.getAllFeedbacks().subscribe(feedbacks => {
      this.feedbackList = feedbacks
    })
  }

  sortByRating() {
    // Toggle the sort direction on each click
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

    // Implement your sorting logic here, sorting the feedbackList by rating
    // For example:
    this.feedbackList.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.rating - b.rating; // Ascending order
      } else {
        return b.rating - a.rating; // Descending order
      }
    });
  }
}
