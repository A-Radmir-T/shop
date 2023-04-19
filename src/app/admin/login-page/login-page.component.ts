import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

import {IUser} from "../../shared/interface";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup
  submitted = false
  message = ''

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
    this.route.queryParams.subscribe((params) => {
      if (params['authAgain']) {
        this.message = 'Чтобы войти введите логин и пароль'
      }
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true
    const user: IUser = {
      email: this.form.value.email,
      password: this.form.value.password,
    }

    this.authService.login(user).subscribe({
      next: () => {
        this.submitted = false
        this.router.navigate(['/admin', 'dashboard'])
      },
      error: () => {
        this.submitted = false
      }
    })

  }
}
