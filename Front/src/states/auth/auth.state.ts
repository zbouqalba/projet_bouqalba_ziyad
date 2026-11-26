import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthStateModel, UserProfile } from './auth.model';
import { Login, Logout } from './auth.actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    isAuthenticated: false,
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static user(state: AuthStateModel): UserProfile | null {
    return state.user;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return state.isAuthenticated;
  }

  @Selector()
  static username(state: AuthStateModel): string {
    return state.user ? state.user.nom : '';
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login): void {
    const simulatedUser: UserProfile = {
      id: 1,
      email: action.payload.email,
      nom: action.payload.nom,
      role: 'user',
    };

    ctx.patchState({
      user: simulatedUser,
      isAuthenticated: true,
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    ctx.patchState({
      user: null,
      isAuthenticated: false,
    });
  }
}
