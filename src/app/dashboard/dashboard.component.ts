import { IngresoEgresoService } from '../ingreso-egreso/ingreso-egreso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(public ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit() {
  	this.ingresoEgresoService.initIngresoEgresoListener();
  }

}
