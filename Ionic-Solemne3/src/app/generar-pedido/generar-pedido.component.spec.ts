import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GenerarPedidoComponent } from './generar-pedido.component';

describe('GenerarPedidoComponent', () => {
  let component: GenerarPedidoComponent;
  let fixture: ComponentFixture<GenerarPedidoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [GenerarPedidoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenerarPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
