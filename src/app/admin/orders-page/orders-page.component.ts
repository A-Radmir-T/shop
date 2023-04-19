import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {IOrder} from "../../shared/interface";
import {OrderService} from "../../shared/services/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrdersPageComponent implements OnInit{
  orders: IOrder[] = []
  submitted = false

  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.getOrders().subscribe((orders) => {
      this.orders = orders
    })
  }

  ready(id: string) {
    this.submitted = true
    this.orderService.ready(id).subscribe({
      next: () => {
        this.submitted = false
        this.orders = this.orders.filter(order => order.id !== id)
      },
      error: () => this.submitted = false
    })
  }
}
