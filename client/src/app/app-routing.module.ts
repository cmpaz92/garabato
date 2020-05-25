import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './modules/auth/guards/logged-in/logged-in.guard';
import { NotFoundComponent } from './modules/shared/components/not-found/not-found.component';


const routes: Routes = [{
  path: 'dashboard',
  // adding the CanLoad guard here. This module can only be loaded when the user is logged in
  canLoad: [LoggedInGuard],
  loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
