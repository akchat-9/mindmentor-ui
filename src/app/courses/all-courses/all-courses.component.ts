import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { CoursesService } from 'src/app/_services/courses.service';
import { CoursesViewModel } from 'src/app/ViewModel/CoursesViewModel';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
})
export class AllCoursesComponent {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  courses!: CoursesViewModel[];
  category: string = '';
  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.courseService.getUsers().subscribe((courses) => {
      this.courses = courses;
      this.dtTrigger.next(true);
    });

    this.route.params.subscribe((params) => {
      this.category = params['category'];
      if (this.category != null) {
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          searching: true,
          search: {
            search: this.category,
          },
        };
      } else {
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          searching: true,
        };
      }
    });
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next(true);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  editCourses(id: number) {
    this.router.navigate(['/courses/settings', id]);
  }
}
