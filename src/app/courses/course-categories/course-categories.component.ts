import { Component } from '@angular/core';
import { CategoryCountViewModel } from 'src/app/ViewModel/CategoryCountViewModel';
import { CourseListViewModel } from 'src/app/ViewModel/CourseListViewModel';
import { CoursesService } from 'src/app/_services/courses.service';

interface Category {
  name: string;
  courses: CourseListViewModel[];
}
@Component({
  selector: 'app-course-categories',
  templateUrl: './course-categories.component.html',
  styleUrls: ['./course-categories.component.css'],
})
export class CourseCategoriesComponent {
  constructor(private courseService: CoursesService) { }
  // get courses from the service
  catCountList!: CategoryCountViewModel[];
  categories: any = {};
  organisationId: number = 1;

  // newColor: string = '';
  ngOnInit(): void {

    this.courseService.getCourseCategoriesAndCount(this.organisationId).subscribe(response => {
      if (response.statusCode === 200) {
        this.catCountList = response.data;
      }
    })
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
