import { TestBed } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router, UrlTree } from '@angular/router';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let isLoggedIn = false;
  const dummyUrlTree = new UrlTree();

  beforeEach(() => {
    isLoggedIn = false;
    authService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    authService.isLoggedIn.and.callFake(() => {
      console.log('calling fake', isLoggedIn);
      return isLoggedIn;
    });
    router = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree']);
    router.createUrlTree.and.callFake(() => dummyUrlTree);
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
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canLoad should return false if user is logged out and the router should have been called', () => {
    isLoggedIn = false;
    const canLoad = guard.canLoad(null, null);
    expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(canLoad).toBeFalse();
  });

  it('canLoad should return true if user is logged in', () => {
    isLoggedIn = true;
    const canLoad = guard.canLoad(null, null);
    expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(canLoad).toBeTrue();
  });

  it('canActivate should return urlTree if user is logged out', () => {
    isLoggedIn = false;
    const result = guard.canActivate(null, null);
    expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toBe(dummyUrlTree);
  });

  it('canActivate should return true if user is logged in', () => {
    isLoggedIn = true;
    const result = guard.canActivate(null, null);
    console.log('result', result);
    expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toBeTrue();
  });

  it('canActivateChild should return urlTree if user is logged out', () => {
    isLoggedIn = false;
    const result = guard.canActivateChild(null, null);
    expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toBe(dummyUrlTree);
  });

  it('canActivateChild should return true if user is logged in', () => {
    isLoggedIn = true;
    const result = guard.canActivateChild(null, null);
    expect(authService.isLoggedIn).toHaveBeenCalledTimes(1);
    expect(result).toBeTrue();
  });
});
