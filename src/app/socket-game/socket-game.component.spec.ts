import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketGameComponent } from './socket-game.component';

describe('SocketGameComponent', () => {
  let component: SocketGameComponent;
  let fixture: ComponentFixture<SocketGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocketGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocketGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
