import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
// import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgresoModel } from '../ingreso-egreso.model';

import * as fromIngresoEgreso from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {

	public ingresos:number = 0;
	public egresos:number = 0;
	//public colorsDona = ['#0040FF','#FF0000'];
	public colorsDona: Array<any> = [
    { // all colors in order
      backgroundColor: ['#5882FA', '#FF0000']
    }
	];

	public cuantosIngresos:number = 0;
	public cuantosEgresos:number = 0;

	public subscription:Subscription = new Subscription();
  // Doughnut
  public doughnutChartLabels:string[] = ['Ingresos', 'Egreso'];
  public doughnutChartData:number[] = [];
  constructor(private store:Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
  	this.subscription = this.store.select('ingresoEgreso').subscribe((ingresoEgreso)=>{
  		this.contarIngresoEgresos(ingresoEgreso.items);
  	});
  }

  contarIngresoEgresos(items:IngresoEgresoModel[]){
		this.ingresos = 0;
		this.egresos = 0;
		this.cuantosIngresos = 0;
		this.cuantosEgresos = 0;
		items.forEach((item)=>{
			console.log("item.tipo", item.tipo);
			switch (item.tipo) {
				case "ingreso":
					this.cuantosIngresos++;
					this.ingresos += item.monto;
					break;				
				case "egreso":
					this.cuantosEgresos++;
					this.egresos += item.monto;
					break;
			}
		});
		this.doughnutChartData = [this.ingresos,this.egresos];
  }

 
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}
