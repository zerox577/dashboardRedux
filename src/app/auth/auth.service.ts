import { Subscription } from 'rxjs';
import { SetUserAction, UnSetUserAction } from './auth.actions';
import { ActivarLoadingAction,DesactivarLoadingAction } from '../shared/ui.accions';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import Swal from 'sweetalert2'
import {UserModel} from './user.model';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private suscription:Subscription = new Subscription();
	private usuario:UserModel;

	constructor(public afAuth: AngularFireAuth,private router:Router,private afDB:AngularFirestore,private store:Store<AppState>) { }

	initAuthListener(){
		this.afAuth.authState.subscribe((afUser:firebase.User)=>{
			
			if(afUser){
				this.suscription = this.afDB.doc(`${afUser.uid}/usuario`).valueChanges().subscribe((response:any)=>{
					const newUser = new UserModel(response);
					
					this.store.dispatch(new SetUserAction(newUser));
					this.usuario = newUser;
				});
			}else{
				this.usuario = null;
				this.suscription.unsubscribe();
			}
		});
	}

	crearUsuario(nombre,email,password){

		this.store.dispatch( new ActivarLoadingAction() );
		this.afAuth.auth.createUserWithEmailAndPassword(email,password)
		.then((response)=>{
			const user:UserModel = {
				uid: response.user.uid,
				nombre: nombre,
				email: response.user.email
			};

			this.afDB.doc(`${user.uid}/usuario`)
				.set(user)
					.then((result)=>{
						this.router.navigate(['/']);
						this.store.dispatch( new DesactivarLoadingAction() );
					});
		})
		.catch((error)=>{
			this.store.dispatch( new DesactivarLoadingAction() );
			Swal('Error Registro',error.message,'error');
			
		});
	}
	login(email,password){
		this.store.dispatch( new ActivarLoadingAction() );
		this.afAuth.auth.signInWithEmailAndPassword(email,password)
		.then((response)=>{
			this.router.navigate(['/']);
		})
		.catch((error)=>{
			this.store.dispatch( new DesactivarLoadingAction() );
			Swal('Error Login',error.message,'error');
		});
	}
	cerrarSesion(){
		this.router.navigate(['/login']);
		this.afAuth.auth.signOut();
		this.store.dispatch(new UnSetUserAction());
	}

	isAuth(){
		return this.afAuth.authState.pipe(
			map((afUser)=>{
				if(afUser == null)this.router.navigate(['/login']);
				return afUser != null;
			})
		);
	}
	getUsuario(){
		return {...this.usuario};
	}
}
