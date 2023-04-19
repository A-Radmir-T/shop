import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {IProduct} from "../../interface";
import {BasketService} from "../../services/basket.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {

  count = 0
  id = ''
  subIncr!: Subscription
  subDecr!: Subscription

  @Input()
  product!: IProduct

  constructor(private basketService: BasketService) {
  }

  ngOnInit() {
    this.id = this.product.id || ''
    this.count = this.basketService.getCountById(this.id)
  }
  ngOnDestroy() {
    if (this.subIncr) {
      this.subIncr.unsubscribe()
    }
    if (this.subDecr) {
      this.subDecr.unsubscribe()
    }
  }

  increment(id: string) {
    this.subIncr = this.basketService.increment(id).subscribe(count => {
      this.count = count
    })
  }

  decrement(id: string) {
    this.subDecr = this.basketService.decrement(id).subscribe(count => {
      this.count = count
    })
    if (this.subIncr) {
      this.subIncr.unsubscribe()
    }
    if (this.subDecr) {
      this.subDecr.unsubscribe()
    }
  }

  addInBasket(product: IProduct) {
    this.count = this.basketService.addProduct(product)
  }
}
