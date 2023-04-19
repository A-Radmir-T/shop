import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditPageComponent} from './edit-page.component';
import {AlertService} from "../shared/services/alert.service";
import {SliderService} from "../../shared/services/slider.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {EMPTY, Observable, of, throwError} from "rxjs";
import {ActivatedRoute, Params, provideRouter, Router} from "@angular/router";
import {RouterTestingHarness, RouterTestingModule} from "@angular/router/testing";
import {IProduct} from "../../shared/interface";
import {ProductService} from "../../shared/services/product.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {QuillModule} from "ngx-quill";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CreatePageComponent} from "../create-page/create-page.component";
import {productFormInit} from "../../shared/dataTests";


describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;

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


  const fakeAlertService = jasmine.createSpyObj('fakeAlertService', ['success', 'warning'])
  const fakeProductService = jasmine.createSpyObj('fakeProductService', [
    'edit',
    'remove',
    'getById'
  ])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSelectModule,
        QuillModule,
        MatCheckboxModule,
        BrowserAnimationsModule
      ],
      declarations: [EditPageComponent],
      providers: [
        {provide: AlertService, useValue: fakeAlertService},
        {provide: ProductService, useValue: fakeProductService},
        provideRouter([
          {path: 'product/1/edit', component: EditPageComponent},
          {path: 'admin/menu/set', component: EditPageComponent}
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents()
      .then(async () => {
        let harness = await RouterTestingHarness.create();
        let comp = await harness.navigateByUrl(`product/1/edit`, EditPageComponent);
      })

    fixture = TestBed.createComponent(EditPageComponent);
    component = fixture.componentInstance;
    fakeProductService.getById.and.returnValue(of(fakeProduct))
    fixture.detectChanges();
  });

  it('should call ProductService.getById() when called ngOnInit', () => {
    expect(fakeProductService.getById).toHaveBeenCalled()
  });

  it('should init form when ngOnInit', () => {
    expect(component.form).toBeTruthy()
  })

  it('should not be called ProductService.create() if form invalid', () => {
    fakeProductService.edit.calls.reset()
    component.submit()
    expect(fakeProductService.edit).not.toHaveBeenCalled()
  })

  it('should call ProductService.edit() when called submit()', () => {
    fakeProductService.edit.and.returnValue(EMPTY)
    productFormInit(component)
    component.submit()
    expect(fakeProductService.edit).toHaveBeenCalled()
    expect(component.submitted).toBeTruthy()
  })

  it('should call alertService.success() when subscribing to ProductService.edit()', () => {
    fakeProductService.edit.and.returnValue(of(EMPTY))
    productFormInit(component)
    component.submit()
    fixture.detectChanges()
    expect(fakeAlertService.success).toHaveBeenCalled()
    expect(component.submitted).toBeFalsy()
  })

  it('should call router.navigate when subscribing to ProductService.edit()', () => {
    fakeProductService.edit.and.returnValue(of(EMPTY))
    const router = TestBed.inject(Router)
    const spy = spyOn(router, 'navigate')
    productFormInit(component)
    component.submit()
    fixture.detectChanges()

    expect(spy).toHaveBeenCalledWith(['/admin', 'menu', 'set'])

  })

  it('should update submitted if ProductService.edit() return error', () => {
    fakeProductService.edit.and.returnValue(throwError(() => '2'))
    productFormInit(component)
    component.submit()
    fixture.detectChanges()

    expect(component.submitted).toBeFalsy()
  })

});
