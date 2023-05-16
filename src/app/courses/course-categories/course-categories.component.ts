import { Component } from '@angular/core';
import { CoursesViewModel } from 'src/app/ViewModel/CoursesViewModel';
import { CoursesService } from 'src/app/_services/courses.service';

interface Category {
  name: string;
  courses: CoursesViewModel[];
}
@Component({
  selector: 'app-course-categories',
  templateUrl: './course-categories.component.html',
  styleUrls: ['./course-categories.component.css'],
})
export class CourseCategoriesComponent {
  constructor(private courseService: CoursesService) {}
  // get courses from the service
  courses!: CoursesViewModel[];
  categories: any = {};

  // newColor: string = '';
  ngOnInit(): void {
    // this.newColor = RandomColor.generateColor();
    // get courses from the service
    this.courseService.getUsers().subscribe((courses) => {
      this.courses = courses;

      for (const course of courses) {
        if (!this.categories[course.category]) {
          this.categories[course.category] = [];
        }
        this.categories[course.category].push(course);
      }

      // convert category object to array
      this.categories = Object.keys(this.categories).map((categoryName) => ({
        name: categoryName,
        courses: this.categories[categoryName],
      }));
    });
  }
}
