import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

import {ProductService} from "../../shared/services/product.service";
import {IProduct} from "../../shared/interface";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  id = ''
  form!: FormGroup
  modules = {
    toolbar: [
      ['image']
    ]
  }
  submitted = false

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        this.id = params['id']
        return this.productService.getById(this.id)
      })
    ).subscribe(product => {
      this.form = new FormGroup({
        title: new FormControl(product.title, [Validators.required]),
        category: new FormControl(product.category, [Validators.required]),
        image: new FormControl(product.image, [Validators.required]),
        weight: new FormControl(product.weight, [Validators.required]),
        amount: new FormControl(product.amount),
        price: new FormControl(product.price, [Validators.required]),
        composition: new FormControl(product.composition, [Validators.required]),
        new: new FormControl(product.new),
        tempura: new FormControl(product.tempura),
        sale: new FormControl(product.sale),
      })
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    const product: IProduct = {
      id: this.id,
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

    this.productService.edit(product).subscribe({
      next: () => {
        this.submitted = false
        this.alertService.success('Продукт обновлён')
        this.router.navigate(['/admin', 'menu', product.category])
      },
      error: () => this.submitted = false
    })
  }

}
