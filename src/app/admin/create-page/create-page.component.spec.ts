import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {CreatePageComponent} from './create-page.component';
import {CUSTOM_ELEMENTS_SCHEMA, forwardRef} from "@angular/core";
import {ProductService} from "../../shared/services/product.service";
import {AlertService} from "../shared/services/alert.service";
import {NG_VALUE_ACCESSOR, ReactiveFormsModule} from "@angular/forms";
import {catchError, EMPTY, map, of, tap, throwError} from "rxjs";
import {MatSelectModule} from "@angular/material/select";
import {QuillModule} from "ngx-quill";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {productFormInit} from "../../shared/dataTests";

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;

  const fakeProductService = jasmine.createSpyObj('fakeProductService', ['create'])
  const fakeAlertService = jasmine.createSpyObj('fakeAlertService', ['success'])


  beforeEach(async () => {
    let MatSelectComponent: ComponentFixture<any>;
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        QuillModule,
        BrowserAnimationsModule
      ],
      declarations: [CreatePageComponent],
      providers: [
        {provide: ProductService, useValue: fakeProductService},
        {provide: AlertService, useValue: fakeAlertService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()
  });

  it('should init form when called ngOnInit', () => {
    expect(component.form).toBeTruthy()
  });

  it('fakeProductService.create() should not be called if the form is not valid', () => {
    fakeProductService.create.calls.reset()
    fakeProductService.create.and.returnValue(EMPTY)
    component.submit()
    expect(fakeProductService.create).not.toHaveBeenCalled()
  });

  it('should call fakeProductService.create() when called submit()', () => {
    productFormInit(component)
    fakeProductService.create.and.returnValue(EMPTY)
    component.submit()
    expect(fakeProductService.create).toHaveBeenCalled()
    expect(component.submitted).toBeTruthy()
  })

  it('should call alertService.success() when subscribing to productService.create()', () => {
    fakeProductService.create.and.returnValue(of(EMPTY))
    productFormInit(component)
    component.submit()
    fixture.detectChanges()
    expect(fakeAlertService.success).toHaveBeenCalled()
    expect(component.submitted).toBeFalsy()
  })

  it('should update submitted if ProductService.edit() return error', () => {
    fakeProductService.create.and.returnValue(throwError(() => '2'))
    productFormInit(component)
    component.submit()
    fixture.detectChanges()

    expect(component.submitted).toBeFalsy()
  })

});
