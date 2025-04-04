import { TestBed } from '@angular/core/testing';
import { HttpInterceptor } from '@angular/common/http';

import { ApiRouteInterceptor } from './api-route.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

describe('apiRouteInterceptor', () => {
  let cookieServiceSpy: jasmine.SpyObj<CookieService> = jasmine.createSpyObj('CookieService', ['get', 'set', 'delete']);
  let interceptor: HttpInterceptor;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);
    interceptor = new ApiRouteInterceptor(cookieServiceSpy, toastrServiceSpy);
    interceptor = new ApiRouteInterceptor(cookieServiceSpy, toastrServiceSpy);
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
