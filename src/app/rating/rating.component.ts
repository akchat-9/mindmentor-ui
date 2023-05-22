import { Component } from '@angular/core';

import { FeedbackViewModel } from 'src/app/ViewModel/FeedbackViewModel';
import { FeedbackService } from 'src/app/_services/feedback.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  feedbackList!: FeedbackViewModel[];
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  constructor(private feedbackService: FeedbackService) { }
  ngOnInit() {
    this.getAllFeedback();
  }
  onPageChange(event: any): void {
    this.currentPage = event;
  }
  getAllFeedback() {
    this.feedbackService.getAllFeedbacks().subscribe(feedbacks => {
      this.feedbackList = feedbacks
      this.totalItems = this.feedbackList.length;
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
