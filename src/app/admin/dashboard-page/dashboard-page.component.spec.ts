import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPageComponent} from './dashboard-page.component';
import {AlertService} from "../shared/services/alert.service";
import {SliderService} from "../../shared/services/slider.service";
import {QuillModule} from "ngx-quill";
import {EMPTY, of, throwError} from "rxjs";
import {ReactiveFormsModule} from "@angular/forms";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {ISlider} from "../../shared/interface";
import {By} from "@angular/platform-browser";
import {productFormInit} from "../../shared/dataTests";

describe('DashboardPageComponent', () => {
  let component: DashboardPageComponent;
  let fixture: ComponentFixture<DashboardPageComponent>;

  const formInit = (component: DashboardPageComponent) => {
    component.form.get('image')?.setValue('1')
  }

  const fakeAlertService = jasmine.createSpyObj('fakeAlertService', ['success', 'warning'])
  const fakeSliderService = jasmine.createSpyObj('fakeSliderService', [
    'getAll',
    'create',
    'remove'
  ])

  const slider: ISlider = {
    image: '',
    id: '1'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        QuillModule,
        ReactiveFormsModule,

      ],
      declarations: [DashboardPageComponent],
      providers: [
        {provide: AlertService, useValue: fakeAlertService},
        {provide: SliderService, useValue: fakeSliderService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPageComponent);
    component = fixture.componentInstance;

    fakeSliderService.getAll.and.returnValue(of([slider]))
    fakeSliderService.remove.and.returnValue(of(EMPTY))
    fixture.detectChanges();
  });

  it('should create form with 1 control', () => {
    expect(component.form.contains('image')).toBeTruthy()
  });

  it('should call SliderService.getAll() when called ngOnInt()', () => {
    expect(fakeSliderService.getAll).toHaveBeenCalled()
  })

  it('should update sliders length after ngOnInit', () => {
    expect(component.sliders.length).toBe(1)
  })

  it('should not be called fakeSliderService.create() if form invalid', () => {
    fakeSliderService.create.calls.reset()
    component.submit()
    expect(fakeSliderService.create).not.toHaveBeenCalled()
  })

  it('should call SliderService.create() when called submit()', () => {
    fakeSliderService.create.and.returnValue(EMPTY)
    formInit(component)
    component.submit()
    expect(fakeSliderService.create).toHaveBeenCalled()
    expect(component.submitted).toBeTruthy()
  })

  it('should call alertService.success() when subscribing to SliderService.create()', () => {
    fakeSliderService.create.and.returnValue(of(slider))
    formInit(component)
    component.submit()
    expect(fakeAlertService.success).toHaveBeenCalled()
    expect(component.submitted).toBeFalsy()
  })

  it('should update sliders length after subscribing to SliderService.create()', () => {
    fakeSliderService.create.and.returnValue(of(slider))
    formInit(component)
    component.submit()
    expect(component.sliders.length).toBe(2)
  })

  it('should remove slider if user confirm', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.remove('1')

    expect(fakeSliderService.remove).toHaveBeenCalledWith('1')
    expect(component.sliders.length).toBe(0)
  })

  it('should call fakeAlertService.warning() after subscribing to SliderService.remove()', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    component.remove('1')

    expect(fakeAlertService.warning).toHaveBeenCalled()
  })

  it('should not be called fakeSliderService.remove unless the user has confirmed', () => {
    fakeSliderService.remove.calls.reset()
    spyOn(window, 'confirm').and.returnValue(false)

    expect(fakeSliderService.remove).not.toHaveBeenCalled()
  })

  it('should call fakeSliderService.remove() when clicked button remove', () => {
    spyOn(window, 'confirm').and.returnValue(true)
    const btn = fixture.debugElement.query(By.css('.btn-danger'))
    btn.triggerEventHandler('click', null)

    expect(fakeSliderService.remove).toHaveBeenCalled()
  })

  it('should update submitted if fakeSliderService.create() return error', () => {
    fakeSliderService.create.and.returnValue(throwError(() => '2'))
    formInit(component)
    component.submit()
    fixture.detectChanges()

    expect(component.submitted).toBeFalsy()
  })


});
