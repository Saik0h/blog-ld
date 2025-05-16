import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigosComponent } from './artigos.component';

describe('ArtigosComponent', () => {
  let component: ArtigosComponent;
  let fixture: ComponentFixture<ArtigosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtigosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
