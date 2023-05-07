import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachingSessionsComponent } from './coaching-sessions.component';

describe('CoachingSessionsComponent', () => {
  let component: CoachingSessionsComponent;
  let fixture: ComponentFixture<CoachingSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachingSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoachingSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
