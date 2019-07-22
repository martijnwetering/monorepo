import { async, TestBed } from '@angular/core/testing';
import { AuthModule } from './auth.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  AUTH_FEATURE_KEY,
  initialState as authInitialState,
  authReducer
} from './+state/auth.reducer';
import { AuthEffects } from './+state/auth.effects';
import { AuthFacade } from './+state/auth.facade';

describe('AuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthModule).toBeDefined();
  });
});
