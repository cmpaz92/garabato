import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private authService: AuthService, private router: Router) {
  }

  // will be called when a route is accessed. If it resolves to true, the user may access this route
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }

  // will be called when a route-child is accessed. If it resolves to true, the user may access the child route
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isLoggedIn();
  }

  // will be called before a module loads. This can be prevented by returning false.
  // Additionally the user should be redirected otherwise a blank screen will be shown
  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // everything is fine. Start loading the module...
    return true;
  }

  isLoggedIn() {
    // checks if the user is not logged in. If so, the user will be redirected to the login page
    if (!this.authService.isLoggedIn()) {
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }
}
