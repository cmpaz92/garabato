import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedInComponent } from './components/logged-in/logged-in.component';
import { RouterModule } from '@angular/router';
import { LoggedOutComponent } from './components/logged-out/logged-out.component';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [LoggedInComponent, LoggedOutComponent, NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class SharedModule { }
