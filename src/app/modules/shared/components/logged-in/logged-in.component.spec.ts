import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedInComponent } from './logged-in.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoggedInComponent', () => {
  let component: LoggedInComponent;
  let fixture: ComponentFixture<LoggedInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ LoggedInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
