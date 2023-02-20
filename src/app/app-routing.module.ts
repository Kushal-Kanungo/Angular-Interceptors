import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/guard/auth-guard.service';
import { CanDeactivateGuard } from './dashboard/can-deactivate-guard.service';
import { MyFormComponent } from './my-form/my-form.component';
import { PaginationComponent } from './pagination/pagination.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuardService],
    canDeactivate: [CanDeactivateGuard],
    component: DashboardComponent,
  },
  {
    path: 'pagination',
    redirectTo: 'pagination/1',
  },
  {
    path: 'pagination/:page',
    canActivate: [AuthGuardService],
    component: PaginationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: MyFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
