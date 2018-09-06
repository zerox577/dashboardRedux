import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styles: []
})
export class LoginComponent implements OnInit {

	constructor(private authService:AuthService) { }	

	ngOnInit() {
	}
	onSubmit(value){
		console.log("value", value);
		this.authService.login(value.correo,value.password);
	}
}
