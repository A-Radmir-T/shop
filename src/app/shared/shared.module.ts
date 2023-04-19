import {NgModule} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {QuillViewHTMLComponent} from "ngx-quill";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgIf, TitleCasePipe} from "@angular/common";

import {LoadImageDirective} from './services/load-image.directive';
import {ProductComponent} from "./components/product/product.component";

@NgModule({
  imports: [
    MatIconModule,
    MatProgressBarModule,
    QuillViewHTMLComponent,
    ReactiveFormsModule,
    RouterLink,
    TitleCasePipe,
    NgIf,
  ],
  exports: [
    MatIconModule,
    MatProgressBarModule,
    LoadImageDirective,
    QuillViewHTMLComponent,
    ReactiveFormsModule,
    ProductComponent,
  ],
  declarations: [
    LoadImageDirective,
    ProductComponent,
  ],
})
export class SharedModule {}
