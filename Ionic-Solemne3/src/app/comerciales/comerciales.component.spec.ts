import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ComercialesComponent } from './comerciales.component';

describe('ComercialesComponent', () => {
  let component: ComercialesComponent;
  let fixture: ComponentFixture<ComercialesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ComercialesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ComercialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
