import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";

import {AlertService} from "../../services/alert.service";
import {alertType} from "../../../../shared/interface";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  subAlert!: Subscription
  expires = 3000
  text = ''
  type!: alertType

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.subAlert = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type
      const timeout = setTimeout(() => {
        this.text = '',
          clearTimeout(timeout)
      }, this.expires)
    })
  }

  ngOnDestroy() {
    if(this.subAlert) {
      this.subAlert.unsubscribe()
    }
  }

}
