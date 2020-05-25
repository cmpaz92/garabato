import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    authService = jasmine.createSpyObj('AuthService', ['getMe']);
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ DashboardComponent ],
      providers: [{
        provide: HttpClient,
        useValue: {},
      }, {
        provide: AuthService,
        useValue: authService,
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
