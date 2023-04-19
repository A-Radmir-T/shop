import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';
import {testProduct} from "../dataTests";
import {Subject} from "rxjs";
import {IBasket} from "../interface";

describe('BasketService', () => {
  let service: BasketService;
  let spyOrders$: Subject<{ [key: string]: IBasket }>

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
    service.clear()
    // @ts-ignore
    spyOrders$ = spyOn(service.orders$, 'next')
  });

  it('should call orders$.next() if the basket is not empty when called initBasket()', () => {
    service.addProduct(testProduct)
    service.initBasket()
    expect(spyOrders$).toHaveBeenCalled()
  })

  it('should return basket if the basket is not empty when called getOrders()', () => {
    service.addProduct(testProduct)
    const result = service.getOrders()
    expect(result).toBeTruthy()
  })

  it('should return basket if the basket is not empty', () => {
    service.addProduct(testProduct)
    const result = service.fromBasket
    expect(result).toBeTruthy()
  })

  it('should return null if basket empty', () => {
    const result = service.fromBasket
    expect(result).toBe(null)
  })

  it('should call localStorage.setItem when called addProduct() ', () => {
    const spy = spyOn(window.localStorage, 'setItem')
    service.addProduct(testProduct)
    expect(spy).toHaveBeenCalledWith('basket', JSON.stringify(service.orders))
  })

  it('should call orders$ when called addProduct()', () => {
    service.addProduct(testProduct)
    expect(spyOrders$).toHaveBeenCalled()
  })

  it('should return count when called addProduct()', () => {
    const result = service.addProduct(testProduct)
    expect(result).toBe(1)
  })

  it('should incremented count when called increment()', () => {
    service.addProduct(testProduct)
    service.increment('1')

    expect(service.orders['1'].count).toEqual(2)
  })

  it('should decremented count when called decrement()', () => {
    service.addProduct(testProduct)
    service.decrement('1')

    expect(service.orders['1'].count).toEqual(0)
  })

  it('should call service.remove() if count === 0 when called decrement()', () => {
    const spy = spyOn(service, 'remove')
    service.addProduct(testProduct)
    service.decrement('1').subscribe()

    expect(spy).toHaveBeenCalled()
  })

  it('should remove order by id when called remove()', () => {
    service.addProduct(testProduct)
    service.remove('1')

    expect(service.orders).toEqual({})
  })

  it('should clear orders by id when called clear()', () => {
    service.addProduct(testProduct)
    service.clear()

    expect(service.orders).toEqual({})
  })

  it('should return the product count when called getCountById()', () => {
    service.addProduct(testProduct)
    const result = service.getCountById('1')

    expect(result).toBe(1)
  })

  it('should return 0 if there is no product in the cart', () => {
    const result = service.getCountById('0')
    expect(result).toBe(0)
  })


});
