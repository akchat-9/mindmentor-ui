import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './AuthComponents/login/login.component';
import { HeaderComponent } from './GlobalComponents/header/header.component';
const routes: Routes = [
  {
    path: 'dashboard', component: HeaderComponent, 
    // children: [
    //   { path: 'home', component: HomeComponent },
    //   { path: 'about', component: AboutComponent },
    // ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
