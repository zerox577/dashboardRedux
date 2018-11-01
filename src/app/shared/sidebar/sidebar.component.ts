import { AuthService } from '../../auth/auth.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit,OnDestroy {
	public nombre: string;
	public subscription: Subscription = new Subscription();;

  constructor(private store:Store<AppState>,private authService:AuthService,public ingresoEgreso:IngresoEgresoService) { }

  ngOnInit() {
  	this.subscription = this.store.select('auth')
	  .pipe(
			filter( auth => auth.user != null)
		)
		.subscribe((auth)=>{
			this.nombre = auth.user.nombre;
		});
  }
	cerrarSesion(){
		this.authService.cerrarSesion();
		//Reinicia el estado de los items a ser un arreglo vacio
		this.ingresoEgreso.cancelarSubscription();
	}
	ngOnDestroy(){
		this.subscription.unsubscribe();
	}
}
