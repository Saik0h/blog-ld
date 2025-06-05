import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxWidgetComponent } from './inbox-widget.component';

describe('InboxWidgetComponent', () => {
  let component: InboxWidgetComponent;
  let fixture: ComponentFixture<InboxWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
