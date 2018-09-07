import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit,OnDestroy {

	public cargando:boolean;
	public subscription:Subscription;

  constructor(private authService:AuthService,public store:Store<AppState>) { }	

	ngOnInit() {
		this.subscription = this.store.select('ui').subscribe((ui)=>{
      this.cargando = ui.isLoading
    });
	}
	onSubmit(value){
		
		this.authService.login(value.correo,value.password);
	}
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
