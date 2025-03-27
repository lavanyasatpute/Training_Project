import { TestBed } from '@angular/core/testing';
import { HttpInterceptor } from '@angular/common/http';

import { ApiRouteInterceptor } from './api-route.interceptor';
import { CookieService } from 'ngx-cookie-service';

describe('apiRouteInterceptor', () => {
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['get', 'set']);
    interceptor = new ApiRouteInterceptor(cookieServiceSpy);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
