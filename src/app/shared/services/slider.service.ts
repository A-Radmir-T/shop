import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

import {IFbCreateResponse, ISlider} from "../interface";
import {environment} from "../../../environments/environment";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  create(slide: ISlider): Observable<ISlider> {
    return this.http.post<IFbCreateResponse>(`${environment.fbDbUrl}/sliders.json`, slide).pipe(
      map((response) => {
        return {
          id: response.name,
          ...slide
        }
      })
    )
  }

  getAll(): Observable<ISlider[]> {
    this.productService.loading = true
    return this.http.get<ISlider[]>(`${environment.fbDbUrl}/sliders.json`).pipe(
      map((response: {[key: string]: any}) => {
        this.productService.loading = false
        return Object.keys(response).map(key => {
          return {
            id: key,
            ...response[key]
          }
        })
      })
    )
  }

  remove(id: string) {
    return this.http.delete(`${environment.fbDbUrl}/sliders/${id}.json`)
  }
}
