import { IngresoEgresoModel } from './ingreso-egreso.model';
import { Action } from '@ngrx/store';


export const SET_ITEMS = '[Ingreso Egreso] Set Items';
export const UNSET_ITEMS = '[Ingreso Egreso] UnSet Items';


export class SetItemsAction implements Action {
	readonly type = SET_ITEMS;

	constructor(public items:IngresoEgresoModel[]) {}
}
export  class UnsetItemsAction implements Action {
	readonly type = UNSET_ITEMS;
}


export type acciones = SetItemsAction | UnsetItemsAction;