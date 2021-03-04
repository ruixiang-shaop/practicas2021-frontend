import { TestBed } from '@angular/core/testing';

import { UpdateAfterLoginService } from './update-after-login.service';

describe('UpdateAfterLoginService', () => {
  let service: UpdateAfterLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAfterLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
