import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuillEditorComponent} from "ngx-quill";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";

import {AdminRoutingModule} from './admin-routing.module';
import {AdminLayoutComponent} from './shared/components/admin-layout/admin-layout.component';
import {DashboardPageComponent} from './dashboard-page/dashboard-page.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {CreatePageComponent} from './create-page/create-page.component';
import {EditPageComponent} from './edit-page/edit-page.component';
import {SharedModule} from "../shared/shared.module";
import {MenuAdminComponent} from './menu-admin/menu-admin.component';
import {AlertComponent} from './shared/components/alert/alert.component';
import {OrdersPageComponent} from './orders-page/orders-page.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    DashboardPageComponent,
    LoginPageComponent,
    CreatePageComponent,
    EditPageComponent,
    MenuAdminComponent,
    AlertComponent,
    OrdersPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    QuillEditorComponent,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
