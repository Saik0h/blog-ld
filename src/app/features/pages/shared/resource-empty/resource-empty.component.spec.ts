import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceEmptyComponent } from './resource-empty.component';

describe('ResourceEmptyComponent', () => {
  let component: ResourceEmptyComponent;
  let fixture: ComponentFixture<ResourceEmptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResourceEmptyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
