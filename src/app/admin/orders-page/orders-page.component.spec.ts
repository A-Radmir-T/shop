import {ComponentFixture, TestBed} from '@angular/core/testing';

import {OrdersPageComponent} from './orders-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EMPTY, of, throwError} from "rxjs";
import {testOrder} from "../../shared/dataTests";
import {OrderService} from "../../shared/services/order.service";

describe('OrdersPageComponent', () => {
  let component: OrdersPageComponent;
  let fixture: ComponentFixture<OrdersPageComponent>;

  const fakeOrderService = jasmine.createSpyObj('fakeOrderService', ['getOrders', 'ready'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [OrdersPageComponent],
      providers: [
        {provide: OrderService, useValue: fakeOrderService}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrdersPageComponent);
    fakeOrderService.getOrders.and.returnValue(of([testOrder]))
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call fakeOrderService.getOrders when ngOnInit', () => {
    expect(fakeOrderService.getOrders).toHaveBeenCalled()
  })

  it('should update orders when ngOnInit', () => {
    expect(component.orders.length).toBe(1)
  })

  it('should call fakeOrderService.ready() when called ready()', () => {
    fakeOrderService.ready.and.returnValue(EMPTY)
    component.ready('1')

    expect(fakeOrderService.ready).toHaveBeenCalledWith('1')
    expect(component.submitted).toBeTruthy()
  })

  it('should update orders when called fakeOrderService.ready()', () => {
    fakeOrderService.ready.and.returnValue(of(EMPTY))
    component.ready('1')
    expect(component.orders.length).toBe(0)
    expect(component.submitted).toBeFalsy()
  })

  it('should update submitted if  fakeOrderService.ready() return error', () => {
    fakeOrderService.ready.and.returnValue(throwError(() => '2'))
    component.ready('1')

    expect(component.submitted).toBeFalsy()
  })

});
