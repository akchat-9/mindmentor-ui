import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { FullCalendarModule } from '@fullcalendar/angular';


import { AppComponent } from './app.component';
import { LoginComponent } from './AuthComponents/login/login.component';
import { HeaderComponent } from './GlobalComponents/header/header.component';
import { RegisterComponent } from './AuthComponents/register/register.component';
import { OverviewComponent } from './dashboard/overview/overview.component';
import { AnalyticsComponent } from './dashboard/analytics/analytics.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
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



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    OverviewComponent,
    AnalyticsComponent,
    NotificationsComponent,
    AllCoursesComponent,
    CreateCoursesComponent,
    CourseCategoriesComponent,
    CourseSettingsComponent,
    AllUsersComponent,
    CreateUsersComponent,
    CoachingSessionsComponent,
    AvailabilityCalendarComponent,
    BookingsComponent,
    RemindersComponent,
    CreateEditSessionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    FullCalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
