import {AfterContentChecked, AfterViewInit, ChangeDetectorRef, Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterContentChecked{

  constructor(private changeDetector: ChangeDetectorRef) {
  }

  ngAfterContentChecked() {
    this.changeDetector.detectChanges()
  }

}
