import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { RegisterComponent } from './pages/register/register.component';
import { LoggedOutComponent } from '../shared/components/logged-out/logged-out.component';

const routes: Routes = [{
  path: '',
  canActivate: [LoggedOutGuard],
  canActivateChild: [LoggedOutGuard],
  // using a base component for any public "page"
  component: LoggedOutComponent,
  children: [{
    path: 'login',
    component: LoginComponent,
  }, {
    path: 'register',
    component: RegisterComponent,
  }, {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  }],
}, {
  path: 'logout',
  canActivate: [LoggedInGuard],
  component: LogoutComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
