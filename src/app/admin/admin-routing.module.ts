import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdminLayoutComponent} from "./shared/components/admin-layout/admin-layout.component";
import {DashboardPageComponent} from "./dashboard-page/dashboard-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {CreatePageComponent} from "./create-page/create-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";
import {canActivateAdmin} from "./shared/services/canActivateAdmin";
import {canActivateLogin} from "./shared/services/canActivateLogin";
import {MenuAdminComponent} from "./menu-admin/menu-admin.component";
import {OrdersPageComponent} from "./orders-page/orders-page.component";

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent, canActivate: [canActivateLogin]},
      {path: 'dashboard', component: DashboardPageComponent, canActivate: [canActivateAdmin]},
      {path: 'create', component: CreatePageComponent, canActivate: [canActivateAdmin]},
      {path: 'menu/:id', component: MenuAdminComponent, canActivate: [canActivateAdmin]},
      {path: 'product/:id/edit', component: EditPageComponent, canActivate: [canActivateAdmin]},
      {path: 'orders', component: OrdersPageComponent, canActivate: [canActivateAdmin]},
      {path: '**', redirectTo: ''},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
