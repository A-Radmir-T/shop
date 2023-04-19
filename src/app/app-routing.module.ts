import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {MenuPageComponent} from "./menu-page/menu-page.component";
import {BasketPageComponent} from "./basket-page/basket-page.component";
import {CheckoutPageComponent} from "./checkout-page/checkout-page.component";
import {ProductResolver} from "./shared/services/product.resolver";
import {ErrorPageComponent} from "./error-page/error-page.component";

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {path: 'home', component: HomePageComponent},
      {path: 'error', component: ErrorPageComponent},
      {
        path: 'product/:id',
        component: ProductPageComponent,
        resolve: {
          product: ProductResolver
        }
      },
      {path: 'menu/:id', component: MenuPageComponent},
    ]
  },
  {path: 'basket', component: BasketPageComponent},
  {path: 'checkout', component: CheckoutPageComponent},

  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
