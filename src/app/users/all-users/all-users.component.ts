import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { CoursesService } from 'src/app/_services/courses.service';
import { CoursesViewModel } from 'src/app/ViewModel/CoursesViewModel';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent {
  private dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  courses!: CoursesViewModel[];
  constructor(private courseService: CoursesService) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };

    this.courseService.getUsers().subscribe((courses) => this.courses = courses);
    console.log(this.courses)
  }
}
