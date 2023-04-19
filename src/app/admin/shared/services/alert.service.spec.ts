import { TestBed } from '@angular/core/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    const spy = spyOn(service.alert$, 'next')
    service.success('text')
    expect(spy).toHaveBeenCalledWith({type: 'success', text: 'text'})
  })

  it('should be created', () => {
    const spy = spyOn(service.alert$, 'next')
    service.warning('text')
    expect(spy).toHaveBeenCalledWith({type: 'warning', text: 'text'})
  })

});
