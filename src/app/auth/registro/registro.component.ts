import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit,OnDestroy {

  public cargando:boolean;
  public subscription:Subscription = new Subscription();

  constructor(private authService:AuthService,public store:Store<AppState>) { }  

  ngOnInit() {
    this.store.select('ui').subscribe((ui)=>{
      this.cargando = ui.isLoading
    });
  }
  onSubmit(value){
    this.authService.crearUsuario(value.nombre,value.correo,value.password);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
