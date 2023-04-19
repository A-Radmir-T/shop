import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {ProductService} from "../shared/services/product.service";
import {IProduct} from "../shared/interface";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss']
})
export class MenuPageComponent implements OnInit {

  products: IProduct[] = []
  byCategories: IProduct[] = []

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        const id = this.route.snapshot.params['id']
        this.products = products
        this.byCategories = products.filter(prod => prod.category === id)
      },
      error: () => {
        this.router.navigate(['/error'])
        this.productService.loading = false
      }
    })
    this.route.params.subscribe((params) => {
      this.byCategories = this.products.filter(prod => prod.category === params['id'])
    })
  }
}
