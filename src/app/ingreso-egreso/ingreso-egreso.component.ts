import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { IngresoEgresoModel } from './ingreso-egreso.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit,OnDestroy {

	public forma: FormGroup;
	public tipo = 'ingreso';
	public loadingSubs:Subscription = new Subscription();
	public cargando:boolean;

  constructor(public ingresoEgresoService:IngresoEgresoService,private store:Store<AppState>) { }

  ngOnInit() {
  	this.loadingSubs = this.store.select('ui').subscribe((ui)=>{
  		this.cargando = ui.isLoading
  	});

  	this.forma = new FormGroup({
  		'descripcion': new FormControl('',Validators.required),
  		'monto': new FormControl(0, Validators.min(0))
  	});
  }
	crearIngresoEgreso(){

		this.store.dispatch(new ActivarLoadingAction());

		const ingresoEgreso = new IngresoEgresoModel({...this.forma.value,tipo:this.tipo})
		this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
		.then((response)=>{
			Swal('Creado',ingresoEgreso.descripcion,'success');
			this.forma.reset({ monto:0 });
			this.store.dispatch(new DesactivarLoadingAction());
		})
		.catch((error)=>{
			console.log("error", error);
		});
	}
	ngOnDestroy(){
		this.loadingSubs.unsubscribe();
	}
}


/*
	En TS_INGRESO_CLIENTES tecinf (O5) al momento de modificar un documento con el consecutivo 32605 la respuesta en ADN 3.0 no retorna la informacion que viene en el tag de DOCS_IMPLICADOS_PENDS.
*/