import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CheckoutPageComponent} from './checkout-page.component';
import {BasketService} from "../shared/services/basket.service";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {OrderService} from "../shared/services/order.service";
import {ReactiveFormsModule} from "@angular/forms";
import {IBasket} from "../shared/interface";
import {EMPTY, of, throwError} from "rxjs";
import {testBasket} from "../shared/dataTests";

describe('CheckoutPageComponent', () => {
  let component: CheckoutPageComponent;
  let fixture: ComponentFixture<CheckoutPageComponent>;
  const formInit = (component: CheckoutPageComponent) => {
    component.form.get('name')?.setValue('1')
    component.form.get('phone')?.setValue('1')
    component.form.get('address')?.setValue('1')
  }
  const fakeOrder: IBasket = testBasket
  const fakeBasketService = {
    ...jasmine.createSpyObj('fakeBasketService', [
      'initBasket',
      'increment',
      'decrement',
      'clear'
    ]),
    getOrders: () => []
  }
  const fakeOrderService = {
    ...jasmine.createSpyObj('fakeOrderService', [
      'getOrders',
      'addOrder',
    ])
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [CheckoutPageComponent],
      providers: [
        {provide: BasketService, useValue: fakeBasketService},
        {provide: OrderService, useValue: fakeOrderService},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CheckoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('the message should be empty', () => {
    component.ngOnInit()
    expect(component.message).toBe('')
  });

  it('should called basketService.getOrders()', () => {
    spyOn(fakeBasketService, 'getOrders').and.returnValues([fakeOrder])
    component.ngOnInit()
    expect(fakeBasketService.getOrders).toHaveBeenCalled()
    expect(component.orders.length).toBe(1)
  });

  it('should create form with 3 controls', () => {
    component.ngOnInit()
    expect(component.form.contains('name')).toBeTruthy()
    expect(component.form.contains('phone')).toBeTruthy()
    expect(component.form.contains('address')).toBeTruthy()
  });

  it('order sum', () => {
    fakeOrder.price = 10
    fakeOrder.count = 2
    spyOn(fakeBasketService, 'getOrders').and.returnValues([fakeOrder])
    component.ngOnInit()
    expect(component.sum).toBe(20)
  });

  it('orderService.addOrder() should not be called if the form is not valid', () => {
    fakeOrderService.addOrder.calls.reset()
    component.submit()
    expect(fakeOrderService.addOrder).not.toHaveBeenCalled()
  })

  it('orderService.addOrder() should called if the form is valid', () => {
    formInit(component)
    fakeOrderService.addOrder.and.callFake(() => EMPTY)
    component.submit()
    expect(fakeOrderService.addOrder).toHaveBeenCalled()
    expect(component.submitted).toBeTruthy()
  })

  it('should update message when subscribing to OrderService.addOrder()', () => {
    formInit(component)
    fakeOrderService.addOrder.and.returnValue(of(EMPTY))
    component.submit()
    expect(component.submitted).toBeFalsy()
    expect(component.message).toContain('Ваш заказ принят')
  })

  it('should call fakeBasketService.clear() when subscribing to OrderService.addOrder()', () => {
    formInit(component)
    fakeOrderService.addOrder.and.returnValue(of(EMPTY))
    component.submit()
    expect(fakeBasketService.clear).toHaveBeenCalled()
  })

  it('should update submitted if fakeOrderService.addOrder() return error', () => {
    fakeOrderService.addOrder.and.returnValue(throwError(() => '2'))
    formInit(component)
    component.submit()

    expect(component.submitted).toBeFalsy()
  })

});
