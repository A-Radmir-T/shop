import {Injectable} from '@angular/core';
import {Observable, of, Subject, tap} from "rxjs";

import {IBasket, IProduct} from "../interface";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  orders$: Subject<{ [key: string]: IBasket }> = new Subject<{ [key: string]: IBasket }>()
  basket: { [key: string]: any } = {}
  orders: { [key: string]: IBasket } = {}

  constructor() {
  }

  initBasket(): void {
    if (this.fromBasket !== null) this.orders = JSON.parse(this.fromBasket)
    this.orders$.next(this.orders)
  }

  getOrders(): IBasket[] {
    if (this.fromBasket !== null) this.orders = JSON.parse(this.fromBasket)
    return Object.keys(this.orders).map(key => this.orders[key])
  }

  get fromBasket(): string | null {
    return localStorage.getItem('basket')
  }

  addProduct(product: IProduct): number {
    const id = product.id || ''
    this.orders[id] = {
      count: 1,
      ...product
    }
    localStorage.setItem('basket', JSON.stringify(this.orders))
    this.orders$.next(this.orders)
    return this.getCountById(id)
  }

  increment(id: string): Observable<number> {
    this.orders[id].count += 1
    localStorage.setItem('basket', JSON.stringify(this.orders))
    this.orders$.next(this.orders)
    return of( this.orders[id].count)
  }

  decrement(id: string): Observable<number> {
    this.orders[id].count -= 1
    localStorage.setItem('basket', JSON.stringify(this.orders))
    this.orders$.next(this.orders)
    return of( this.orders[id].count).pipe(
      tap((count) => {
        if (count === 0) this.remove(id)
      })
    )
  }

  remove(id: string): void {
    delete this.orders[id]

    this.orders$.next(this.orders)
    localStorage.setItem('basket', JSON.stringify(this.orders))
  }

  clear() {
    this.orders = {}
    localStorage.removeItem('basket')
    this.orders$.next(this.orders)
  }

  getCountById(id: string): number {
    if (this.fromBasket && JSON.parse(this.fromBasket)[id]) {
      this.orders = JSON.parse(this.fromBasket)
      return this.orders[id].count
    }
    return 0
  }
}
