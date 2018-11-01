import { UserModel } from './user.model';
import { Action } from '@ngrx/store';
export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] UnSet User';

export class SetUserAction implements Action {
	readonly type = SET_USER;
	constructor(public user:UserModel) {
		// code...
	}
}
export class UnSetUserAction implements Action {
	readonly type = UNSET_USER;
}

export type acciones = SetUserAction | UnSetUserAction;