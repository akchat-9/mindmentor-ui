import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTablesModule, DataTableDirective } from 'angular-datatables';
import { CoursesService } from 'src/app/_services/courses.service';
import { UserViewModel } from 'src/app/ViewModel/UsersViewModel';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent {
  private dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  users!: UserViewModel[];
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
    };

    this.userService.getUsers().subscribe((users) => (this.users = users));
    console.log(this.users);
  }

  editUsers(id: number) {
    this.router.navigate(['/users/settings', id]);
  }
}
