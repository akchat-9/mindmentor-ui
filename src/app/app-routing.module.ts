import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './AuthComponents/login/login.component';
import { AllCoursesComponent } from './courses/all-courses/all-courses.component';
import { CreateCoursesComponent } from './courses/create-courses/create-courses.component';
import { CourseCategoriesComponent } from './courses/course-categories/course-categories.component';
import { CourseSettingsComponent } from './courses/course-settings/course-settings.component';
import { AllUsersComponent } from './users/all-users/all-users.component';
import { CreateUsersComponent } from './users/create-users/create-users.component';
import { CoachingSessionsComponent } from './schedule/coaching-sessions/coaching-sessions.component';
import { AvailabilityCalendarComponent } from './schedule/availability-calendar/availability-calendar.component';
import { BookingsComponent } from './schedule/bookings/bookings.component';
import { RemindersComponent } from './schedule/reminders/reminders.component';
import { CreateEditSessionsComponent } from './schedule/create-edit-sessions/create-edit-sessions.component';
import { CreateAssignmentComponent } from './assignment/create-assignment/create-assignment.component';
import { ViewAssignmentComponent } from './assignment/view-assignment/view-assignment.component';
import { ViewSubmissionsComponent } from './assignment/view-submissions/view-submissions.component';
import { AssignmentRemindersComponent } from './assignment/reminders/reminders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateFeedbackComponent } from './feedback/create-feedback/create-feedback.component';
import { ViewFeedbackComponent } from './feedback/view-feedback/view-feedback.component';
import { UserSettingsComponent } from './users/user-settings/user-settings.component';
import { UserGroupsComponent } from './users/user-groups/user-groups.component';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'courses',
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllCoursesComponent },
      { path: 'all/:category', component: AllCoursesComponent },
      { path: 'create', component: CreateCoursesComponent },
      { path: 'categories', component: CourseCategoriesComponent },
      { path: 'settings/:id', component: CourseSettingsComponent },
    ],
  },
  {
    path: 'users',
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllUsersComponent },
      { path: 'create', component: CreateUsersComponent },
      { path: 'settings/:id', component: UserSettingsComponent },
      { path: 'groups', component: UserGroupsComponent },
    ],
  },
  {
    path: 'schedule',
    children: [
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: 'sessions', component: CoachingSessionsComponent },
      { path: 'calendar', component: AvailabilityCalendarComponent },
      { path: 'create', component: BookingsComponent },
      { path: 'reminders', component: RemindersComponent },
      { path: 'customize/:id', component: CreateEditSessionsComponent },
      { path: 'customize', component: CreateEditSessionsComponent },
    ],
  },
  {
    path: 'assignment',
    children: [
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: 'create_new', component: CreateAssignmentComponent },
      { path: 'create_new/:id', component: CreateAssignmentComponent },
      { path: 'view_assignments', component: ViewAssignmentComponent },
      { path: 'view_submissions', component: ViewSubmissionsComponent },
      { path: 'reminders', component: AssignmentRemindersComponent },
    ],
  },
  {
    path: 'feedback',
    children: [
      { path: '', redirectTo: 'sessions', pathMatch: 'full' },
      { path: 'createNew', component: CreateFeedbackComponent },
      { path: 'viewFeedback', component: ViewFeedbackComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
