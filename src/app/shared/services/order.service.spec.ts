import {TestBed} from '@angular/core/testing';

import {OrderService} from './order.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../interface";
import {EMPTY, of} from "rxjs";
import {environment} from "../../../environments/environment";

describe('OrderService', () => {
  let service: OrderService;
  let http: HttpClient
  const order: IOrder = {
    id: '',
    phone: '',
    name: '',
    address: '',
    products: []
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(OrderService);
    http = TestBed.inject(HttpClient)
  });

  it('should call http.post() when called addOrder()', () => {
    const spy = spyOn(http, 'post')
    service.addOrder(order)

    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/orders.json`, order)
  })

  it('should call http.get() when called addOrder()', () => {
    const spy = spyOn(http, 'get').and.returnValue(of(EMPTY))
    service.getOrders()

    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/orders.json`)
  })

  it('should return order when called addOrder()', () => {
    let result: IOrder[]
    const response: {[key: string]: IOrder} = {
      '1': order
    }

    const spy = spyOn(http, 'get').and.returnValue(of(response))
    service.getOrders().subscribe((res) => {
      expect(res.length).toBe(1)
      expect(res[0].id).toBe('1')
    })
  })

  it('should call http.get() when called addOrder()', () => {
    const id = '1'
    const spy = spyOn(http, 'delete').and.returnValue(of(EMPTY))
    service.ready(id)

    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/orders/${id}.json`)
  })

});
