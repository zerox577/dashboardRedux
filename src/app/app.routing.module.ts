import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistroComponent } from './auth/registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashBoardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {
  	path: '', 
  	component: DashboardComponent,
  	children:dashBoardRoutes,
    canActivate:[AuthGuardService]
  },
  {path: '**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}