import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPageComponent } from './menu-page.component';
import {ProductService} from "../shared/services/product.service";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {EMPTY, fromEvent, of, throwError} from "rxjs";
import {IProduct} from "../shared/interface";

describe('MenuPageComponent', () => {
  let component: MenuPageComponent;
  let fixture: ComponentFixture<MenuPageComponent>;

  const fakeProduct: IProduct = {
    id: '1',
    price: 0,
    amount: 0,
    image: '',
    title: '',
    weight: 0,
    category: '',
    composition: ''
  }

  const fakeProductService = jasmine.createSpyObj('fakeProductService', [
    'getAll'
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MenuPageComponent ],
      providers: [
        {provide: ProductService, useValue: fakeProductService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuPageComponent);
    component = fixture.componentInstance;
  });

  it('should call fakeProductService.getAll() when ngOnInit', () => {
    fakeProductService.getAll.and.returnValue(of([fakeProduct, fakeProduct]))
    component.ngOnInit()
    expect(fakeProductService.getAll).toHaveBeenCalled()
    expect(component.products.length).toBe(2)
  })


});
