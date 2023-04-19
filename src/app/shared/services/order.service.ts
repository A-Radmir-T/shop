import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {IFbCreateResponse, IOrder} from "../interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  addOrder(order: IOrder): Observable<any> {
    return this.http.post<IFbCreateResponse>(`${environment.fbDbUrl}/orders.json`, order)
  }

  getOrders(): Observable<IOrder[]> {
    return this.http.get(`${environment.fbDbUrl}/orders.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map((key) => {
            return {
              ...response[key],
              id: key,
            }
          })
      })
    )
  }

  ready(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/orders/${id}.json`)
  }

}


