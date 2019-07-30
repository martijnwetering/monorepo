import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { AuthPartialState } from './auth.reducer';
import { authQuery } from './auth.selectors';
import { LoadAuth } from './auth.actions';
import { authHelper } from '@monolib/util/auth-helpers/auth-helpers';

@Injectable()
export class AuthFacade {
  loaded$ = this.store.pipe(select(authQuery.getLoaded));
  allAuth$ = this.store.pipe(select(authQuery.getAllAuth));
  selectedAuth$ = this.store.pipe(select(authQuery.getSelectedAuth));

  constructor(private store: Store<AuthPartialState>) {
    authHelper();
  }

  loadAll() {
    this.store.dispatch(new LoadAuth());
  }
}
