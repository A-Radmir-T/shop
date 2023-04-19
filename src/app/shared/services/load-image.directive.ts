import {Directive, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appLoadImage]'
})
export class LoadImageDirective {

  constructor(
    private renderer: Renderer2) {
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    this.renderer.selectRootElement('.form-image .ql-editor p')
  }

}
