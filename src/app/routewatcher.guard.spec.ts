import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routewatcherGuard } from './routewatcher.guard';

describe('routewatcherGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routewatcherGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
