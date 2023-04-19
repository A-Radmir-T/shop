import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import {AlertService} from "../../services/alert.service";
import {EMPTY, of, Subject} from "rxjs";
import {IAlert} from "../../../../shared/interface";

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  const fakeAlertService = {
    ...jasmine.createSpyObj('fakeAlertService', ['success', 'warning']),
    alert$: new Subject<IAlert>()
  }
  const alert: IAlert = {
    type: 'success',
    text: 'text'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ],
      providers: [
        {provide: AlertService, useValue: fakeAlertService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update type and text when called alert$', () => {
    fakeAlertService.alert$.next(alert)
    expect(component.type).toBe('success')
    expect(component.text).toBe('text')
  })

  it('should update text after 3 sec', fakeAsync(() => {
    fakeAlertService.alert$.next(alert)
    expect(component.text).toBe('text')
    tick(3000)
    expect(component.text).toBe('')
  }))

});
