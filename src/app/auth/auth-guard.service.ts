import { AuthService } from './auth.service';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate,CanLoad {

  constructor(private router:Router,private authService:AuthService) { }

  canActivate(){
  	return this.authService.isAuth();
  }
  canLoad(){
  	return this.authService.isAuth()
  		.pipe(
  			take(1) // emite cuando notoficacion escucha el observable
  		);
  }
}
