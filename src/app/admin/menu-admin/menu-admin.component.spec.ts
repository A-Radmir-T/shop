import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MenuAdminComponent} from './menu-admin.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AlertService} from "../shared/services/alert.service";
import {ProductService} from "../../shared/services/product.service";
import {RouterTestingHarness, RouterTestingModule} from "@angular/router/testing";
import {EditPageComponent} from "../edit-page/edit-page.component";
import {ActivatedRoute, provideRouter, Router} from "@angular/router";
import {EMPTY, of, throwError} from "rxjs";
import {testProduct} from "../../shared/dataTests";
import {QuillConfigModule, QuillModule} from "ngx-quill";

describe('MenuAdminComponent', () => {
  let component: MenuAdminComponent;
  let fixture: ComponentFixture<MenuAdminComponent>;

  const fakeProductService = jasmine.createSpyObj('fakeProductService', ['getAll', 'remove'])
  const fakeAlertService = jasmine.createSpyObj('fakeAlertService', ['warning'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        QuillConfigModule,
        QuillModule,
        RouterTestingModule
      ],
      declarations: [MenuAdminComponent],
      providers: [
        {provide: AlertService, useValue: fakeAlertService},
        {provide: ProductService, useValue: fakeProductService},
        provideRouter([{path: 'admin/menu/:id', component: MenuAdminComponent}])
      ]
    })
      .compileComponents()
      .then(async () => {
        fakeProductService.getAll.and.returnValue(of([testProduct]))
        let harness = await RouterTestingHarness.create();
        let comp = await harness.navigateByUrl(`admin/menu/set`, MenuAdminComponent);
      })

    fixture = TestBed.createComponent(MenuAdminComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call ProductService.getAll() when called ngOnInit', () => {
    expect(fakeProductService.getAll).toHaveBeenCalled()
  })

  it('should update products when called ngOnInit', () => {
    expect(component.products.length).toBe(1)
  })

  it('should call fakeProductService.remove when called remove', () => {
    fakeProductService.remove.and.returnValue(EMPTY)
    component.remove('1')
    expect(fakeProductService.remove).toHaveBeenCalledWith('1')
    expect(component.submitted).toBeTruthy()
  })

  it('should update products and byCategories when called fakeProductService.remove()', () => {
    component.byCategories = component.products
    fakeProductService.remove.and.returnValue(of(EMPTY))
    component.remove('1')
    expect(component.products.length).toBe(0)
    expect(component.byCategories.length).toBe(0)
  })

  it('should call AlertService.warning() when called fakeProductService.remove()', () => {
    fakeAlertService.warning.and.returnValue('')
    fakeProductService.remove.and.returnValue(of(EMPTY))
    component.remove('1')
    expect(fakeAlertService.warning).toHaveBeenCalled()
    expect(component.submitted).toBeFalsy()
  })

  it('should update submitted if fakeProductService.remove() return error', () => {
    fakeProductService.remove.and.returnValue(throwError(() => '2'))
    component.remove('1')
    expect(component.submitted).toBeFalsy()
  })

});
