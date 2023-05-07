import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSessionsComponent } from './create-edit-sessions.component';

describe('CreateEditSessionsComponent', () => {
  let component: CreateEditSessionsComponent;
  let fixture: ComponentFixture<CreateEditSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSessionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
