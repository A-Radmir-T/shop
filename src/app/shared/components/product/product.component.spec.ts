import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductComponent} from './product.component';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {BasketService} from "../../services/basket.service";
import {IProduct} from "../../interface";
import {EMPTY, of} from "rxjs";

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  const fakeProduct: IProduct = {
    id: '1',
    price: 0,
    amount: 0,
    image: '',
    title: '',
    weight: 0,
    category: '',
    composition: ''
  }
  const fakeBasketService = {
    ...jasmine.createSpyObj('fakeBasService', [
      'getCountById',
      'addProduct'
    ]),
    increment: (id: string) => of(1),
    decrement: (id: string) => of(1)
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductComponent],
      providers: [
        {provide: BasketService, useValue: fakeBasketService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.product = fakeProduct
    fixture.detectChanges();
  });

  it('should init id and count when ngOnInit', () => {
    fakeBasketService.getCountById.and.returnValue(0)
    component.ngOnInit()
    expect(fakeBasketService.getCountById).toHaveBeenCalled()
    expect(component.id).toBe('1')
    expect(component.count).toBe(0)
  });

  it('should unsubscribe if subscribed when called ngOnDestroy', () => {
    component.increment('1')
    component.decrement('1')
    const incr = spyOn(component.subIncr, 'unsubscribe')
    const decr = spyOn(component.subDecr, 'unsubscribe')
    component.ngOnDestroy()
    expect(incr).toHaveBeenCalled()
    expect(decr).toHaveBeenCalled()
  });

  it('should call basketService.increment() when called increment', () => {
    spyOn(fakeBasketService, 'increment').and.returnValue(of(0))
    component.increment('1')
    expect(fakeBasketService.increment).toHaveBeenCalledWith('1')
    expect(component.count).toBe(0)
  })

  it('should call basketService.decrement() when called decrement', () => {
    spyOn(fakeBasketService, 'decrement').and.returnValue(of(0))
    component.decrement('1')
    expect(fakeBasketService.decrement).toHaveBeenCalledWith('1')
    expect(component.count).toBe(0)
  })

  it('should unsubscribe if subscribed when called decrement', () => {
    component.increment('1')
    component.decrement('1')
    const incr = spyOn(component.subIncr, 'unsubscribe')
    const decr = spyOn(component.subDecr, 'unsubscribe')
    component.ngOnDestroy()
    expect(incr).toHaveBeenCalled()
    expect(decr).toHaveBeenCalled()
  });

  it('should call basketService.addProduct() when called addInBasket', () => {
    fakeBasketService.addProduct.and.returnValue(0)
    component.addInBasket(fakeProduct)
    expect(fakeBasketService.addProduct).toHaveBeenCalled()
    expect(component.count).toBe(0)
  })

});
