import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedEventComponent } from './joined-event.component';

describe('JoinedEventComponent', () => {
  let component: JoinedEventComponent;
  let fixture: ComponentFixture<JoinedEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinedEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinedEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
