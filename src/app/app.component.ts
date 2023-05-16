import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocalStorageService } from './_services/local-storage.service';
import { Menu } from './model/MenuModel';
import { RoleViewModel } from './ViewModel/RoleViewModel';
import { UserService } from './_services/user.service';
import { HostListener } from '@angular/core';

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

  margin: string = '0px';
  height: string = '100vh';

  screenHeight!: number;
  screenWidth!: number;

  constructor(
    private userService: UserService,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: undefined) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(this.screenHeight, this.screenWidth);
  }

  ngOnInit(): void {
    if (!this.storage.getToken()) {
      this.router.navigate(['']);
    } else {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard']);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.storage.isLoggedIn();
        const user = this.storage.getUser();
        this.username = user.username;
        this.username = this.username.toUpperCase();
        this.roles = user.roles[0];
        if (this.screenWidth <= 990) {
          this.margin = '0px';
        } else {
          this.margin = '250px';
          this.height = '91.5vh';
        }

        // console.log(this.margin)
        // console.log(this.roles);
        this.userService
          .getMenuByRole(this.roles.roleName)
          .subscribe((menulist) => {
            this.menuList = menulist;
            // console.log(this.menuList);
          });
      }
    });
  }

  logout(): void {
    this.storage.signOut();
    this.router.navigate(['']);
    this.margin = '0px';
    // window.location.reload();
  }
}
