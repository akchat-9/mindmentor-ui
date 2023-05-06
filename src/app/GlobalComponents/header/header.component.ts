import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/_services/local-storage.service';
import { UserService } from 'src/app/_services/user.service';
import { Menu } from 'src/app/model/MenuModel';
import { RoleViewModel } from 'src/app/ViewModel/RoleViewModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  // roles!: RoleViewModel;
  // username: string = '';
  // menuList!: Menu[];
  // constructor(
  //   private userService: UserService,
  //   private storage: LocalStorageService,
  //   private router:Router
  // ) {}
  // userRole: string = '';
  // ngOnInit(): void {
  //   const user = this.storage.getUser();
  //   this.username = user.username
  //   this.roles = user.roles[0];
  //   console.log(this.roles);
  //   this.userService
  //     .getMenuByRole(this.roles.roleName)
  //     .subscribe((menulist) => {
  //       this.menuList = menulist;
  //     });
  // }
  // logout(): void {
  //   this.storage.signOut();
  //   this.router.navigate([''])
  // }
}
