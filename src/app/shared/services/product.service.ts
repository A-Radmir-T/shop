import { Injectable } from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

import {IProduct} from "../interface";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  loading = false
  constructor(private http: HttpClient) { }

  create(product: IProduct): Observable<any> {
    return this.http.post(`${environment.fbDbUrl}/products.json`, product)
  }

  getAll(): Observable<IProduct[]> {
    this.loading = true
    return this.http.get<IProduct[]>(`${environment.fbDbUrl}/products.json`).pipe(
      map((response: {[key: string]: any}) => {
        this.loading = false
        return Object.keys(response).map(key => {
          return {
            id: key,
            ...response[key]
          }
        })
      }),
      catchError((err) => {
        console.log(err)
        return throwError(() => err)
      })
    )
  }

  getById(id: string): Observable<IProduct> {
    this.loading = true
    return this.http.get<IProduct>(`${environment.fbDbUrl}/products/${id}.json`).pipe(
      map((response) => {
        this.loading = false
        return {
          id,
          ...response
        }
      })
    )
  }

  edit(product: IProduct): Observable<any> {
    return this.http.patch(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  }

  remove(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/products/${id}.json`)
  }
}
