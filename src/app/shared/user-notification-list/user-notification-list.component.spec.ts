import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotificationListComponent } from './user-notification-list.component';

describe('UserNotificationListComponent', () => {
  let component: UserNotificationListComponent;
  let fixture: ComponentFixture<UserNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNotificationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
