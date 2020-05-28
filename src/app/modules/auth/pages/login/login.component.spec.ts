import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let httpClient: jasmine.SpyObj<HttpClient>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let usernameInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;

  beforeEach(async(() => {
    httpClient = jasmine.createSpyObj('HttpClient', ['post']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    authService = jasmine.createSpyObj('AuthService', ['login']);
    //authService.login.and.returnValue(of({ jwt: '123', user: 0 }));

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{
        provide: AuthService,
        useValue: authService,
      }, {
        provide: HttpClient,
        useValue: httpClient
      }, {
        provide: Router,
        useValue: router,
      }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    usernameInput = fixture.nativeElement.querySelector('input#username');
    passwordInput = fixture.nativeElement.querySelector('input#password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test if input exists', () => {
    expect(usernameInput).not.toBeFalsy();
    expect(passwordInput).not.toBeFalsy();
  });

  it('test username input', (done) => {
    fixture.whenStable().then(() => {
      passwordInput.value = 'ignored';
      usernameInput.value = '123';
      usernameInput.dispatchEvent(new Event('input'));
      expect(fixture.nativeElement.querySelector('.invalid-feedback')).toBeNull();
      expect(component.form.value.username).toBe('123');

      usernameInput.value = '';
      usernameInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.invalid-feedback')).not.toBeNull();
      expect(component.form.value.username).toBe('', 'username should be set to empty string');
      done();
    });
  });

  it('test password input', (done) => {
    fixture.whenStable().then(() => {
      usernameInput.value = 'ignored';
      passwordInput.value = '123';
      passwordInput.dispatchEvent(new Event('input'));
      expect(fixture.nativeElement.querySelector('.invalid-feedback')).toBeNull();
      expect(component.form.value.password).toBe('123');

      passwordInput.value = '';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.invalid-feedback')).not.toBeNull();
      expect(component.form.value.password).toBe('', 'password should be set to empty string');
      done();
    });
  });
  /*
  it('test login call', (done) => {
    fixture.whenStable().then(() => {
      usernameInput.value = 'user';
      usernameInput.dispatchEvent(new Event('input'));
      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(component.form.valid).toBeTrue();

      component.onSubmit();
      expect(authService.login).toHaveBeenCalledWith('user', 'password');
      expect(router.navigate).toHaveBeenCalled();
      done();
    });
  });
  */
});
