import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

import {IAlert} from "../../../shared/interface";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert$: Subject<IAlert> = new Subject<IAlert>()
  constructor() { }

  success(text: string) {
    this.alert$.next({
      type: 'success',
      text
    })
  }

  warning(text: string) {
    this.alert$.next({
      type: 'warning',
      text
    })
  }
}
