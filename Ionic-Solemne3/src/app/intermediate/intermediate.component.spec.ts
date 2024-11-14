import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IntermediateComponent } from './intermediate.component';

describe('IntermediateComponent', () => {
  let component: IntermediateComponent;
  let fixture: ComponentFixture<IntermediateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [IntermediateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IntermediateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
