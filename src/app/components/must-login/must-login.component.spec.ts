import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MustLoginComponent } from './must-login.component';

describe('MustLoginComponent', () => {
  let component: MustLoginComponent;
  let fixture: ComponentFixture<MustLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MustLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MustLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
