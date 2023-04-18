import { TestBed } from '@angular/core/testing';

import { SortVms } from './sort-vms';

describe('SortVms', () => {
  let service: SortVms;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortVms);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
