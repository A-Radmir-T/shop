import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ProductService} from "../../shared/services/product.service";
import {IProduct} from "../../shared/interface";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  products: IProduct[] = []
  byCategories: IProduct[] = []
  submitted = false
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private alertService: AlertService
    ) {
  }

  ngOnInit() {
    this.productService.getAll().subscribe(products => {
      const id = this.route.snapshot.params['id']
      this.products = products
      this.byCategories = this.products.filter(prod => prod.category === id)
    })
    this.route.params.subscribe((params) => {
      this.byCategories = this.products.filter(prod => prod.category === params['id'])
    })
  }

  remove(id: string) {
    this.submitted = true
    this.productService.remove(id).subscribe({
      next: () => {
        this.submitted = false
        this.byCategories = this.byCategories.filter(product => product.id !== id)
        this.products = this.products.filter(product => product.id !== id)
        this.alertService.warning('Продукт удалён')
      },
      error: () => this.submitted = false
    })
  }
}
