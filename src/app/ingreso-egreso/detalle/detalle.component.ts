import { IngresoEgresoService } from '../ingreso-egreso.service';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../ingreso-egreso.model';
import { filter } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit,OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit,OnDestroy {

	public subscription: Subscription = new Subscription();
	public items: IngresoEgresoModel[];

  constructor( private store:Store<fromIngresoEgreso.AppState>,public ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit() {
  	this.subscription = this.store.select('ingresoEgreso')
  		.subscribe((ingresoEgreso)=>{
  			this.items = ingresoEgreso.items;
  		});
  }
  borrarItem(item){
  	this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
  		.then(()=>{
				Swal('Exito',item.descripcion,'success');
	  	});
  }

  ngOnDestroy(){
  	this.subscription.unsubscribe();
  }
}
