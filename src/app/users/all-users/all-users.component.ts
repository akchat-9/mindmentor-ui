import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { CoursesService } from 'src/app/_services/courses.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { UserListViewModel } from 'src/app/ViewModel/UserListViewModel';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  private dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  userList!: UserListViewModel[];
  userRole: string = '';
  IsAdminTeacher: boolean = false;
  organisationId: number = 1;

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: LocalStorageService
  ) { }
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };

    const user = this.storage.getUser();
    this.userRole = user.roles[0].roleName;
    if (this.userRole == 'teacher' || this.userRole == 'admin') {
      this.IsAdminTeacher = true;
    }

    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers(this.organisationId).subscribe(response => {
      if (response.statusCode !== 200) {
        console.log(response);
        return;
      }

      this.userList = response.data
      this.dtTrigger.next(null);
    })
  }

  editUsers(id: number) {
    this.router.navigate(['/users/settings', id]);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
