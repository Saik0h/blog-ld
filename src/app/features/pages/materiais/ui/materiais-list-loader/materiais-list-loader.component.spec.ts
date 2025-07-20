import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaisListLoaderComponent } from './materiais-list-loader.component';

describe('MateriaisListLoaderComponent', () => {
  let component: MateriaisListLoaderComponent;
  let fixture: ComponentFixture<MateriaisListLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaisListLoaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriaisListLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
