import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

import {IProduct} from "../shared/interface";
import {BasketService} from "../shared/services/basket.service";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductPageComponent implements OnInit {

  count = 0
  product!: IProduct
  subIncr!: Subscription
  subDecr!: Subscription


  constructor(
    private route: ActivatedRoute,
    private basketService: BasketService,
    private router: Router
    ) {}

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        this.product = data['product']
        this.count = this.basketService.getCountById(data['product'].id)
      },
      error: () => {
        this.router.navigate(['/error'])
      }
    })
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
