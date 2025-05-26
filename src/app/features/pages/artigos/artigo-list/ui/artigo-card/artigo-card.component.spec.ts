import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoCardComponent } from './artigo-card.component';

describe('ArtigoComponent', () => {
  let component: ArtigoCardComponent;
  let fixture: ComponentFixture<ArtigoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtigoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtigoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
