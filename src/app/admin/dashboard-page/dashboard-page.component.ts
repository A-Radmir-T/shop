import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {ISlider} from "../../shared/interface";
import {SliderService} from "../../shared/services/slider.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  sliders: ISlider[] = []
  form!: FormGroup
  submitted = false
  modules = {
    toolbar: [
      ['image']
    ]
  }

  constructor(
    private sliderService: SliderService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl('', [Validators.required])
    })

    this.sliderService.getAll().subscribe(sliders => {
      this.sliders = sliders
    })

  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true
    const slide: ISlider = {
      image: this.form.value.image
    }
    this.sliderService.create(slide).subscribe({
      next: (response) => {
        this.sliders.push(response)
        this.submitted = false
        this.form.reset()
        this.alertService.success('Пост создан')
      },
      error: () => {
        this.submitted = false
      }
    })
  }

  remove(id: string) {
    if (confirm('Удалить этот пост?')) {
      this.sliderService.remove(id).subscribe({
        next: () => {
          this.alertService.warning('Пост удален')
          this.sliders = this.sliders.filter(slide => slide.id !== id)
        }
      })
    }
  }
}

