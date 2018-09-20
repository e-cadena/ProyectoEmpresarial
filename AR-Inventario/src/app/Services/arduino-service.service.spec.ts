import { TestBed, inject } from '@angular/core/testing';

import { ArduinoServiceService } from './arduino-service.service';

describe('ArduinoServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArduinoServiceService]
    });
  });

  it('should be created', inject([ArduinoServiceService], (service: ArduinoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
