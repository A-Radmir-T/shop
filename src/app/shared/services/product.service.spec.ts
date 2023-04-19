import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IProduct} from "../interface";
import {testProduct} from "../dataTests";
import {EMPTY, of} from "rxjs";

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpClient

  const product: IProduct = testProduct

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(ProductService)
    http = TestBed.inject(HttpClient)
  });

  it('should call http.post() when called create()', () => {
    const spy = spyOn(http, 'post')
    service.create(product)

    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/products.json`, product)
  })

  it('should call http.get() when called getAll()', () => {
    const spy = spyOn(http, 'get').and.returnValue(EMPTY)
    service.getAll()
    expect(service.loading).toBeTruthy()
    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/products.json`)
  })

  it('should return product when called getAll()', () => {
    spyOn(http, 'get').and.returnValue(of({'1': product} ))
    service.getAll().subscribe((result) => {
      expect(result.length).toBe(1)
      expect(result[0].id).toBe('1')
    })
    expect(service.loading).toBeFalsy()
  })

  it('should call http.get() when called getById()', () => {
    const id = '1'
    const spy = spyOn(http, 'get').and.returnValue(EMPTY)
    service.getById(id)
    expect(service.loading).toBeTruthy()
    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/products/${id}.json`)
  })

  it('should return product by id when called getById()', () => {
    spyOn(http, 'get').and.returnValue(of({'1': product} ))
    service.getById('1').subscribe((result) => {
      expect(result.id).toBe('1')
    })
    expect(service.loading).toBeFalsy()
  })

  it('should call http.patch() when called edit()', () => {
    const spy = spyOn(http, 'patch')
    service.edit(product)

    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/products/${product.id}.json`, product)
  })

  it('should call http.delete() when called remove()', () => {
    const id = '1'
    const spy = spyOn(http, 'delete')
    service.remove(id)
    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/products/${id}.json`)
  })

});
