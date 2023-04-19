import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {ProductService} from "../../services/product.service";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  count = 0
  subOrders!: Subscription

  constructor(
    public productService: ProductService,
    private basketService: BasketService) {
  }

  ngOnInit() {
    this.subOrders = this.basketService.orders$.subscribe((orders) => {
      this.count = 0
      Object.keys(orders).forEach(key => {
        this.count += orders[key].count
      })
    })
    this.basketService.initBasket()
  }

  ngOnDestroy() {
    if (this.subOrders) this.subOrders.unsubscribe()
  }
}
