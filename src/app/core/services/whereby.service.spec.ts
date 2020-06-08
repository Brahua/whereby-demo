import { TestBed } from '@angular/core/testing';

import { WherebyService } from './whereby.service';

describe('WherebyService', () => {
  let service: WherebyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WherebyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
