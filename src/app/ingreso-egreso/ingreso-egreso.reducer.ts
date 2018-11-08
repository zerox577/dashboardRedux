import { IngresoEgresoModel } from './ingreso-egreso.model';
import * as fromIngrespEgreso from './ingreso-egreso.actions';
import { AppState } from '../app.reducer';

export interface IngresoEgresoState{
	items:IngresoEgresoModel[];
}

export interface AppState extends AppState {
	ingresoEgreso:IngresoEgresoState
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