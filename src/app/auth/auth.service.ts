import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as auth from 'firebase';
import Swal from 'sweetalert2'
import {UserModel} from './user.model';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(public afAuth: AngularFireAuth,private router:Router,private afDB:AngularFirestore) { }

	initAuthListener(){
		this.afAuth.authState.subscribe((afUser:auth.User)=>{
			console.log("afUser", afUser);
		});
	}

	crearUsuario(nombre,email,password){
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
					});
		})
		.catch((error)=>{
			Swal('Error Registro',error.message,'error');
			
		});
	}
	login(email,password){
		this.afAuth.auth.signInWithEmailAndPassword(email,password)
		.then((response)=>{
			
			this.router.navigate(['/']);
		})
		.catch((error)=>{
			Swal('Error Login',error.message,'error');
			
		});
	}
	cerrarSesion(){
		this.router.navigate(['/login']);
		this.afAuth.auth.signOut();
	}

	isAuth(){
		return this.afAuth.authState.pipe(
			map((afUser)=>{
				if(afUser == null)this.router.navigate(['/login']);
				return afUser != null;
			})
		);
	}
}
