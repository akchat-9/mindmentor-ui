import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './_services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'mindmentor_ui';

  constructor(
    private router: Router,
    private localStorate: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (!this.localStorate.getToken()) {
      this.router.navigate(['']);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
