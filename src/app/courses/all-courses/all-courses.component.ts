import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { CoursesService } from 'src/app/_services/courses.service';
import { CoursesViewModel } from 'src/app/ViewModel/CoursesViewModel';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
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
  userRole: string = '';
  IsAdminTeacher: boolean = false;
  constructor(
    private courseService: CoursesService,
    private route: ActivatedRoute,
    private router: Router,
    private storage: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.courseService.getUsers().subscribe((courses) => {
      this.courses = courses;
      this.dtTrigger.next(true);
    });
    const user = this.storage.getUser();
    this.userRole = user.roles[0].roleName;
    console.log(this.userRole)
    if (this.userRole == 'teacher' || this.userRole == 'admin') {
      this.IsAdminTeacher = true;
    }
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
