import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AdminLayoutComponent} from './admin-layout.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../services/auth.service";
import {provideRouter, Router} from "@angular/router";
import {RouterTestingHarness, RouterTestingModule} from "@angular/router/testing";
import {AlertComponent} from "../alert/alert.component";
import {LoginPageComponent} from "../../../login-page/login-page.component";
import {EditPageComponent} from "../../../edit-page/edit-page.component";

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  const fakeAuthService = jasmine.createSpyObj('fakeAuthService', ['logout', 'isAuthenticated'])

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      declarations: [AdminLayoutComponent, AlertComponent],
      providers: [
        {provide: AuthService, useValue: fakeAuthService},
        provideRouter([
          {path: 'admin', component: AdminLayoutComponent},
          {path: 'admin/login', component: AdminLayoutComponent}
        ])
      ]
    })
      .compileComponents()
      .then(async () => {
        let harness = await RouterTestingHarness.create();
        let comp = await harness.navigateByUrl(`admin`, AdminLayoutComponent);
      })

    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call fakeAuthService.logout when user confirms logout', () => {
    fakeAuthService.logout.and.returnValue('')
    spyOn(window, 'confirm').and.returnValue(true)
    component.logout()
    expect(fakeAuthService.logout).toHaveBeenCalled()
  })

  it('should call router.navigate when user confirms logout', () => {
    const router = TestBed.inject(Router)
    const spy = spyOn(router, 'navigate')
    spyOn(window, 'confirm').and.returnValue(true)
    component.logout()
    expect(spy).toHaveBeenCalledWith(['/admin', 'login'])
  })

});
