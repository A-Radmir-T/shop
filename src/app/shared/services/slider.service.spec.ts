import {TestBed} from '@angular/core/testing';

import {SliderService} from './slider.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ProductService} from "./product.service";
import {HttpClient} from "@angular/common/http";
import {ISlider} from "../interface";
import {environment} from "../../../environments/environment";
import {EMPTY, of} from "rxjs";

describe('SliderService', () => {
  let service: SliderService;
  let http: HttpClient
  const slide: ISlider = {
    id: '1',
    image: ''
  }

  const fakeProductService = {
    loading: false
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: ProductService, useValue: fakeProductService}
      ]
    });
    service = TestBed.inject(SliderService);
    http = TestBed.inject(HttpClient)
  });

  it('should call http.post() when called create()', () => {
    const spy = spyOn(http, 'post').and.returnValue(EMPTY)
    service.create(slide)

    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/sliders.json`, slide)
  })

  it('should return slide when called create()', () => {
    spyOn(http, 'post').and.returnValue(of(EMPTY))
    service.create(slide).subscribe((result) => {
      expect(result).toBeTruthy()
    })
  })

  it('should call http.get() when called getAll()', () => {
    const spy = spyOn(http, 'get').and.returnValue(EMPTY)
    service.getAll()
    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/sliders.json`)
    expect(fakeProductService.loading).toBeTruthy()
  })

  it('should return slide when called getAll()', () => {
    spyOn(http, 'get').and.returnValue(of(EMPTY ))
    service.getAll().subscribe((result) => {
      expect(result.length).toBe(1)
    })
    expect(fakeProductService.loading).toBeFalsy()
  })

  it('should return slide when called create()', () => {
    const id = '1'
    const spy = spyOn(http, 'delete').and.returnValue(of(EMPTY))
    service.remove(id)
    expect(spy).toHaveBeenCalledWith(`${environment.fbDbUrl}/sliders/${id}.json`)
  })

});
