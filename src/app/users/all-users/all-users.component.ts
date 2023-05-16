import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { CoursesService } from 'src/app/_services/courses.service';
import { UsersViewModel } from 'src/app/ViewModel/UsersViewModel';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { UserViewModel } from 'src/app/ViewModel/UserViewModel';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent {
  private dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users!: UsersViewModel[];
  // users!: UserViewModel[];
  userRole: string = '';
  IsAdminTeacher: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: LocalStorageService
  ) {}
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

    this.userService.getUsers().subscribe((users) => (this.users = users));
    // this.userService.getAllUsers().subscribe((users) => (this.users = users));
    console.log(this.users);
  }

  editUsers(id: number) {
    this.router.navigate(['/users/settings', id]);
  }
}
