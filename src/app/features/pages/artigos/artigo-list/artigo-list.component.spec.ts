import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoListComponent } from './artigo-list.component';

describe('ArtigoListComponent', () => {
  let component: ArtigoListComponent;
  let fixture: ComponentFixture<ArtigoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtigoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtigoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
