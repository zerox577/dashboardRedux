import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  constructor(private authService:AuthService) { }	

  ngOnInit() {
  }
  onSubmit(value){
  	console.log("value", value);
  	this.authService.crearUsuario(value.nombre,value.correo,value.password);
  }
}
