import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqInputComponent } from './faq-input.component';

describe('FaqInputComponent', () => {
  let component: FaqInputComponent;
  let fixture: ComponentFixture<FaqInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
