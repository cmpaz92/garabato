import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoggedInGuard } from '../auth/guards/logged-in/logged-in.guard';
import { LoggedInComponent } from '../shared/components/logged-in/logged-in.component';

const routes: Routes = [{
  path: '',
  canActivate: [LoggedInGuard],
  canActivateChild: [LoggedInGuard],
  // using a base component for any secured "page"
  component: LoggedInComponent,
  children: [{
    path: '',
    component: DashboardComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
