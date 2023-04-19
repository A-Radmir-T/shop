import { Component } from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import {ProductService} from "../../../../shared/services/product.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(
    private router: Router,
    public authService: AuthService,
    public productService: ProductService
    ) {
  }
  logout() {
    if (confirm('Вы уверны что хотите выйти?')) {
      this.authService.logout()
      this.router.navigate(['/admin', 'login'])
    }
  }
}
