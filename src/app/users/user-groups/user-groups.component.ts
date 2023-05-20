import { Component } from '@angular/core';
import { CourseListViewModel } from 'src/app/ViewModel/CourseListViewModel';
import { CoursesService } from 'src/app/_services/courses.service';

@Component({
  selector: 'app-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.css']
})
export class UserGroupsComponent {
  constructor(private courseService: CoursesService) {}
  // get courses from the service
  courses!: CourseListViewModel[];
  categories: any = {};

  // newColor: string = '';
  ngOnInit(): void {
    // this.newColor = RandomColor.generateColor();
    // get courses from the service
    // this.courseService.getUsers().subscribe((courses) => {
    //   this.courses = courses;

    //   for (const course of courses) {
    //     if (!this.categories[course.category]) {
    //       this.categories[course.category] = [];
    //     }
    //     this.categories[course.category].push(course);
    //   }

    //   // convert category object to array
    //   this.categories = Object.keys(this.categories).map((categoryName) => ({
    //     name: categoryName,
    //     courses: this.categories[categoryName],
    //   }));
    // });
  }
}
