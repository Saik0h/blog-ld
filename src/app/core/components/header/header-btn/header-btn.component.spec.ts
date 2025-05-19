import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBtnComponent } from './header-btn.component';

describe('HeaderBtnComponent', () => {
  let component: HeaderBtnComponent;
  let fixture: ComponentFixture<HeaderBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
