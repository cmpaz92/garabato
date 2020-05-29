import { TestBed } from '@angular/core/testing';

import { LoggedOutGuard } from './logged-out.guard';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../../services/auth.service';

describe('LoggedOutGuard', () => {
  let guard: LoggedOutGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let isLoggedIn = false;
  const urlTree = new UrlTree();

  beforeEach(() => {
    isLoggedIn = false;
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    authService.isLoggedIn.and.callFake(() => isLoggedIn);
    router = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree']);
    router.createUrlTree.and.callFake(() => urlTree);
    const httpClient = {};

    TestBed.configureTestingModule({
      providers: [{
        provide: HttpClient,
        useValue: httpClient,
      }, {
        provide: Router,
        useValue: router,
      }, {
        provide: AuthService,
        useValue: authService,
      }],
    });
    guard = TestBed.inject(LoggedOutGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should return urlTree if the user is logged in', () => {
    isLoggedIn = true;
    expect(guard.canActivate(null, null)).toBe(urlTree);
  });

  it('canActivate should return true if the user is logged out', () => {
    isLoggedIn = false;
    expect(guard.canActivate(null, null)).toBeTrue();
  });

  it('canActivateChild should return urlTree if the user is logged in', () => {
    isLoggedIn = true;
    expect(guard.canActivateChild(null, null)).toBe(urlTree);
  });

  it('canActivateChild should return true if the user is logged out', () => {
    isLoggedIn = false;
    expect(guard.canActivateChild(null, null)).toBeTrue();
  });
});
