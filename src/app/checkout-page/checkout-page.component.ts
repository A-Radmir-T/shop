import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {BasketService} from "../shared/services/basket.service";
import {IBasket, IOrder} from "../shared/interface";
import {OrderService} from "../shared/services/order.service";

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CheckoutPageComponent implements OnInit {

  form!: FormGroup
  orders: IBasket[] = []
  sum = 0
  submitted = false
  message = ''

  constructor(private basketService: BasketService, private orderService: OrderService) {
  }

  ngOnInit() {
    this.message = ''
    this.orders = this.basketService.getOrders()
    this.orders.forEach(order => {
      this.sum += order.count * order.price
    })
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required],),
      address: new FormControl('', [Validators.required]),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true
    const order: IOrder = {
      products: this.orders,
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
    }

    this.orderService.addOrder(order).subscribe({
      next: () => {
        this.form.reset()
        this.submitted = false
        this.message = 'Ваш заказ принят'
        this.basketService.clear()
      },
      error: () => this.submitted = false
    })

  }
}
