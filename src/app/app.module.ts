import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
