import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './AuthComponents/login/login.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { AllCoursesComponent } from './courses/all-courses/all-courses.component';
import { CreateCoursesComponent } from './courses/create-courses/create-courses.component';
import { CourseCategoriesComponent } from './courses/course-categories/course-categories.component';
import { CourseSettingsComponent } from './courses/course-settings/course-settings.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'notifications', component: NotificationsComponent },
    ],
  },
  {
    path: 'courses',
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllCoursesComponent },
      { path: 'create', component: CreateCoursesComponent },
      { path: 'categories', component: CourseCategoriesComponent },
      { path: 'settings', component: CourseSettingsComponent }
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
