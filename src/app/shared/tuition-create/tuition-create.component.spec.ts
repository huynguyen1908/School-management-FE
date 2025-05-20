import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuitionCreateComponent } from './tuition-create.component';

describe('TuitionCreateComponent', () => {
  let component: TuitionCreateComponent;
  let fixture: ComponentFixture<TuitionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TuitionCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TuitionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
