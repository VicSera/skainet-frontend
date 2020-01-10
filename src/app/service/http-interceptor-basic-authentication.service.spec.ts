import { TestBed } from '@angular/core/testing';

import { HttpInterceptorBasicAuthenticationService } from './http-interceptor-basic-authentication.service';

describe('HttpInterceptorBasicAuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpInterceptorBasicAuthenticationService = TestBed.get(HttpInterceptorBasicAuthenticationService);
    expect(service).toBeTruthy();
  });
});
