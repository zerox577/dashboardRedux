import { IngresoEgresoModel } from './ingreso-egreso.model';
import * as fromIngrespEgreso from './ingreso-egreso.actions';

export interface IngresoEgresoState{
	items:IngresoEgresoModel[];
}

const estadoInicial:IngresoEgresoState = {
	items:[]
};

export function ingresoEgresoReducer(state = estadoInicial, action:fromIngrespEgreso.acciones) {

	switch (action.type) {
		case fromIngrespEgreso.SET_ITEMS:
			return {
				items: [...action.items.map((item)=>{
						return {
							...item
						};
					})
				]
			};
		case fromIngrespEgreso.UNSET_ITEMS:
			return {
				items: []
			}
		default:
			return state;
	}
}