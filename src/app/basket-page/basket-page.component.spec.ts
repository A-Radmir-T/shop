import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BasketPageComponent} from './basket-page.component';
import {BasketService} from "../shared/services/basket.service";
import {RouterTestingHarness, RouterTestingModule} from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {IBasket} from "../shared/interface";
import {ActivatedRoute, provideRouter} from "@angular/router";
import {LoginPageComponent} from "../admin/login-page/login-page.component";
import {EMPTY, of, Subject} from "rxjs";
import {testBasket} from "../shared/dataTests";


describe('BasketPageComponent', () => {
  let component: BasketPageComponent;
  let fixture: ComponentFixture<BasketPageComponent>;
  const fakeBasketService = {
    ...jasmine.createSpyObj('fakeBasService', [
      'initBasket',
      'increment',
      'decrement',
      'clear',
      'remove'
    ]),
    orders$: new Subject<{[key: string]: IBasket}>()
  }

  const fakeOrder: IBasket = {
    id: '1',
    title: '',
    category: '',
    image: '',
    weight: 0,
    amount: 0,
    price: 1,
    composition: '',
    new: false,
    tempura: false,
    sale: false,
    count: 2
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [BasketPageComponent],
      providers: [
        {provide: BasketService, useValue: fakeBasketService},
        provideRouter([
          {path: 'basket', component: BasketPageComponent}
        ])
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(async () => {
        let harness = await RouterTestingHarness.create();
        let comp = await harness.navigateByUrl(`basket`, BasketPageComponent);
      })

    fixture = TestBed.createComponent(BasketPageComponent);
    component = fixture.componentInstance;
    component.orders = [fakeOrder]
    fixture.detectChanges();
  });

  it('should update orders when ngOnInit', () => {
    fakeBasketService.orders$.next({
      '1':[testBasket]
    })
    expect(component.orders.length).toBe(1)
  })

  it('should call BasketService initBasket', () => {
    component.ngOnInit()
    expect(fakeBasketService.initBasket).toHaveBeenCalled()
  });

  it('should call basketservice increment method with id', () => {
    fakeBasketService.increment.and.returnValue(of(EMPTY))
    component.increment('1')
    expect(fakeBasketService.increment).toHaveBeenCalledWith('1')
  });

  it('should call basketservice decrement method with id', () => {
    fakeBasketService.decrement.and.returnValue(of(EMPTY))
    component.decrement('1')
    expect(fakeBasketService.decrement).toHaveBeenCalledWith('1')
  });

  it('should called basketService.clear() when the clear button is clicked', () => {
    const button = fixture.debugElement.query(By.css('#clear'))
    button.nativeElement.click()
    expect(fakeBasketService.clear).toHaveBeenCalled()
  });

  it('should be called component.increment() when the decrement button is clicked', () => {
    const spy = spyOn(component, 'decrement').and.callThrough()
    const button = fixture.debugElement.query(By.css('.order__decrement'))
    button.triggerEventHandler('click', fakeOrder.id)
    expect(spy).toHaveBeenCalledWith('1')
  });

  it('should be called component.increment() when the increment button is clicked', () => {
    const spy = spyOn(component, 'increment').and.callThrough()
    const button = fixture.debugElement.query(By.css('.order__increment'))
    button.triggerEventHandler('click', fakeOrder.id)
    expect(spy).toHaveBeenCalledWith('1')
  });

  it('should called basketService.remove() when the clear button is remove', () => {
    const button = fixture.debugElement.query(By.css('.order__remove'))
    button.triggerEventHandler('click', fakeOrder.id)
    expect(fakeBasketService.remove).toHaveBeenCalledWith('1')
  });

});
