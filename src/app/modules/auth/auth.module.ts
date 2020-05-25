import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { RegisterComponent } from './pages/register/register.component';

console.log(HTTP_INTERCEPTORS);
export function initApp(authService: AuthService) {
  return () => authService.initializeSession();
}

@NgModule({
  declarations: [LoginComponent, LogoutComponent, RegisterComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initApp,
    multi: true,
    deps: [AuthService],
  }, {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor,
  }]
})
export class AuthModule {
  
}
