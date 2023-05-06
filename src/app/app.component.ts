import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from './_services/local-storage.service';
import { Menu } from './model/MenuModel';
import { RoleViewModel } from './ViewModel/RoleViewModel';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mindmentor_ui';
  isLoggedIn: boolean = false;
  roles!: RoleViewModel;
  username: string = '';
  menuList!: Menu[];
  userRole: string = '';

  constructor(
    private userService: UserService,
    private storage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.storage.getToken()) {
      this.router.navigate(['']);
    } else {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard/overview']);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.storage.isLoggedIn();
        const user = this.storage.getUser();
        this.username = user.username;
        this.roles = user.roles[0];
        console.log(this.roles);
        this.userService
          .getMenuByRole(this.roles.roleName)
          .subscribe((menulist) => {
            this.menuList = menulist;
          });
      }
    });
  }

  logout(): void {
    this.storage.signOut();
    this.router.navigate(['']);
    window.location.reload();
  }
}
