import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {BasketService} from "../shared/services/basket.service";
import {IBasket} from "../shared/interface";

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket-page.component.html',
  styleUrls: ['./basket-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasketPageComponent implements OnInit, OnDestroy {

  orders: IBasket[] = []
  sum = 0
  subOrders!: Subscription



  constructor(
    public basketService: BasketService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    if (this.route.snapshot.routeConfig?.path?.includes('basket')) {
      this.subOrders = this.basketService.orders$.subscribe((basket) => {
        this.sum = 0
        this.orders = Object.keys(basket).map(key => {
          this.sum += (basket[key].count * basket[key].price)
          return basket[key]
        })
      })
    }
    this.basketService.initBasket()
  }

  ngOnDestroy() {
    if (this.subOrders) this.subOrders.unsubscribe()
  }

  increment(id: string) {
    this.basketService.increment(id).subscribe().unsubscribe()
  }

  decrement(id: string) {
    this.basketService.decrement(id).subscribe().unsubscribe()
  }
}
