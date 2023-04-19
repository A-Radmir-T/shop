import {Component, OnInit} from '@angular/core';
import {switchMap, tap} from "rxjs";
import {Router} from "@angular/router";

import {IProduct, ISlider} from "../shared/interface";
import {SliderService} from "../shared/services/slider.service";
import {ProductService} from "../shared/services/product.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  sliders!: ISlider[]
  sets: IProduct[] = []
  sushi: IProduct[] = []
  woks: IProduct[] = []

  constructor(
    private sliderService: SliderService,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.sliderService.getAll().pipe(
      tap(sliders => this.sliders = sliders),
      switchMap(() => {
        return this.productService.getAll()
      })
    ).subscribe({
      next: (products) => {
        this.sets = products.filter(product => product.category === 'set' && product.sale)
        this.sushi = products.filter(product => product.category === 'sushi' && product.sale)
        this.woks = products.filter(product => product.category === 'wok' && product.sale)
      },
      error: (error) => {
        console.log('err:', error)
        this.router.navigate(['/error'])
        this.productService.loading = false
      }
    })

  }

}
