import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedEventComponent } from './created-event.component';

describe('CreatedEventComponent', () => {
  let component: CreatedEventComponent;
  let fixture: ComponentFixture<CreatedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatedEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
