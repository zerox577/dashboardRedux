import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
	declarations:[
		LoginComponent,
		RegistroComponent
	],
	imports:[
		CommonModule,
		FormsModule,
		AngularFireAuthModule,
		RouterModule
	]
})

export class AuthModule {

}
