import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';
import { AssignmentViewModel } from 'src/app/ViewModel/AssignmentViewModel';
import { AssignmentService } from 'src/app/_services/assignment.service';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css'],
})
export class ViewAssignmentComponent {
  private dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  assignmentList!: AssignmentViewModel[];
  constructor(
    private assignmentService: AssignmentService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };

    this.assignmentService
      .getAssignemnt()
      .subscribe((assignments) => (this.assignmentList = assignments));
    console.log(this.assignmentList);
  }

  editAssignment(id: number) {
    this.router.navigate(['/assignment/create_new', id]);
  }
}
