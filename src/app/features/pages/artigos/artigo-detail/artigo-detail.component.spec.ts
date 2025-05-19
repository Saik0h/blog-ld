import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoDetailComponent } from './artigo-detail.component';

describe('ArtigoDetailComponent', () => {
  let component: ArtigoDetailComponent;
  let fixture: ComponentFixture<ArtigoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtigoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtigoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
