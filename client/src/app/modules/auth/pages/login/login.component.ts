import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  error: Error = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['user', [Validators.required]],
      password: ['123456', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.loading = true;
      this.error = null;

      this.authService.login(username, password)
        .pipe(
          switchMap(response => {
            // go to the dashboard after a successful login
            return this.router.navigate(['/dashboard']);
          }),
          catchError(error => {
            this.error = error;
            return of(null);
          }),
        )
        .subscribe(() => {
          this.loading = false;
        });
    }
  }
}
