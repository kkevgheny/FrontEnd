import { TestBed, inject } from '@angular/core/testing';

import { FitServiceService } from './fit-service.service';

describe('FitServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FitServiceService]
    });
  });

  it('should ...', inject([FitServiceService], (service: FitServiceService) => {
    expect(service).toBeTruthy();
  }));
});
