import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  user: any = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  load() {
    this.user = null;

    this.authService.getMe().subscribe(user => {
      this.user = user;
    });
  }

  clearToken() {
    this.authService.removeToken();
    console.log('token cleared. Try to load data now');
  }
}
