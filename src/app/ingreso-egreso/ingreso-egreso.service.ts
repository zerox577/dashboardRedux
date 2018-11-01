import { Subscription } from 'rxjs';
import { SetItemsAction,UnsetItemsAction } from './ingreso-egreso.actions';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth/auth.service';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

	public ingresoEgresoListerSubcription:Subscription = new Subscription();
	public ingresoEgresoItemsSubcription:Subscription = new Subscription();

  constructor( private afDB:AngularFirestore,public authService:AuthService, private store:Store<AppState>) { }

  initIngresoEgresoListener(){
  	this.ingresoEgresoListerSubcription = this.store.select('auth')
  	.pipe(filter(auth=> auth.user != null))
  	.subscribe((auth:any)=>{this.ingresoEgresoItems(auth.user.uid);});
  }

  private ingresoEgresoItems(uid:string){
  	this.ingresoEgresoItemsSubcription = this.afDB.collection(`${uid}/ingreso-egresos/items`)
  		.snapshotChanges()
  		.pipe(
  			map(docData => {
  				return docData.map(doc =>{
  					return{
  						uid:doc.payload.doc.id,
  						...doc.payload.doc.data()
  					};
  				});
  			})
  		)
  		.subscribe((coleccion:any[])=>{
  			this.store.dispatch(new SetItemsAction(coleccion));
  		})
  }

  crearIngresoEgreso(ingresoEgreso:IngresoEgresoModel){
  	const user = this.authService.getUsuario();

  	return this.afDB.doc(`${user.uid}/ingreso-egresos`)
			  		.collection('items').add({...ingresoEgreso});
  }

  borrarIngresoEgreso(uid:string){
  	const user = this.authService.getUsuario();
  	return this.afDB.doc(`${user.uid}/ingreso-egresos/items/${uid}`).delete();
  }

  cancelarSubscription(){
		this.ingresoEgresoListerSubcription.unsubscribe();
		this.ingresoEgresoItemsSubcription.unsubscribe();
    this.store.dispatch(new UnsetItemsAction());
  }
}
