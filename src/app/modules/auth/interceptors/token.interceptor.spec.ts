import { TestBed } from '@angular/core/testing';

import { TokenInterceptor } from './token.interceptor';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

describe('TokenInterceptor', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getToken', 'isLoggedIn', 'logout']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        TokenInterceptor,
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: HttpClient,
          useValue: {},
        }, {
          provide: AuthService,
          useValue: authService,
        }
      ]
    });
  });

  it('should be created', () => {
    const interceptor: TokenInterceptor = TestBed.inject(TokenInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
