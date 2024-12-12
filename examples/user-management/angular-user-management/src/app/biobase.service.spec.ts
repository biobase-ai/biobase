import { TestBed } from '@angular/core/testing';

import { BiobaseService } from './biobase.service';

describe('BiobaseService', () => {
  let service: BiobaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiobaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
