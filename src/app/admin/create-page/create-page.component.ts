import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ProductService} from "../../shared/services/product.service";
import {IProduct} from "../../shared/interface";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePageComponent implements OnInit{

  form!: FormGroup
  submitted = false
  modules = {
    toolbar: [
      ['image']
    ]
  }
  constructor(
    private productService: ProductService,
    private alertService: AlertService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required]),
      amount: new FormControl(''),
      price: new FormControl('', [Validators.required]),
      composition: new FormControl('', [Validators.required]),
      new: new FormControl(false),
      tempura: new FormControl(false),
      sale: new FormControl(false),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    const product: IProduct = {
      title: this.form.value.title,
      category: this.form.value.category,
      image: this.form.value.image,
      weight: this.form.value.weight,
      amount: this.form.value.amount,
      price: this.form.value.price,
      composition: this.form.value.composition,
      new: this.form.value.new,
      sale: this.form.value.sale,
      tempura: this.form.value.tempura,
    }

    this.productService.create(product).subscribe({
      next: () => {
        this.form.reset()
        this.alertService.success('Продукт создан')
        this.submitted = false
      },
      error: () => this.submitted = false
    })
  }

}

