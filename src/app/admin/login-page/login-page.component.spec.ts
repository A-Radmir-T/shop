import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginPageComponent} from './login-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, provideRouter, Router} from "@angular/router";
import {RouterTestingHarness} from "@angular/router/testing";
import {EditPageComponent} from "../edit-page/edit-page.component";
import {ReactiveFormsModule} from "@angular/forms";
import {query} from "@angular/animations";
import {EMPTY, of, throwError} from "rxjs";
import {productFormInit} from "../../shared/dataTests";

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  const formInit = (component: LoginPageComponent) => {
    component.form.get('email')?.setValue('test@mail.ru')
    component.form.get('password')?.setValue('123456')
  }

  const fakeAuthService = jasmine.createSpyObj('fakeAuthService', ['login'])
  const fakeProductService = jasmine.createSpyObj('fakeProductService', ['create'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [LoginPageComponent],
      providers: [
        {provide: AuthService, useValue: fakeAuthService},
        provideRouter([
          {path: 'admin/login', component: LoginPageComponent}
        ])
      ]
    })
      .compileComponents()
      .then(async () => {
        let harness = await RouterTestingHarness.create();
        let comp = await harness.navigateByUrl(`admin/login?authAgain=true`, LoginPageComponent);
      })

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init form when ngOnInit', () => {
    expect(component.form).toBeTruthy();
  });

  it('should update message if queryParams contains authAgain', () => {
    expect(component.message).toContain('введите')
  })

  it('should not be called AuthService.login() if form invalid', () => {
    fakeAuthService.login.calls.reset()
    component.submit()
    expect(fakeAuthService.login).not.toHaveBeenCalled()
  })

  it('should call AuthService.login() when called submit()', () => {
    fakeAuthService.login.and.returnValue(EMPTY)
    formInit(component)
    component.submit()
    expect(fakeAuthService.login).toHaveBeenCalled()
    expect(component.submitted).toBeTruthy()
  })

  it('should call router.navigate when called submit()', () => {
    fakeAuthService.login.and.returnValue(of(EMPTY))
    const router = TestBed.inject(Router)
    const spy = spyOn(router, 'navigate')
    formInit(component)
    component.submit()
    expect(spy).toHaveBeenCalledWith(['/admin', 'dashboard'])
    expect(component.submitted).toBeFalsy()
  })

  it('should update submitted if ProductService.edit() return error', () => {
    fakeAuthService.login.and.returnValue(throwError(() => '2'))
    formInit(component)
    component.submit()
    fixture.detectChanges()

    expect(component.submitted).toBeFalsy()
  })

});
