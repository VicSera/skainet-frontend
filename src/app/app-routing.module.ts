import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTripsComponent } from './list-trips/list-trips.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TripComponent } from './trip/trip.component';
import { RegisterComponent } from './register/register.component';
import { RequestsComponent } from './requests/requests.component';


const routes: Routes = [
  { path:'', component: LoginComponent },
  { path:'login', component: LoginComponent },
  { path:'register', component: RegisterComponent },
  { path:'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path:'welcome', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path:'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path:'trips', component: ListTripsComponent, canActivate: [RouteGuardService] },
  { path:'trips/:tripId' , component: TripComponent, canActivate: [RouteGuardService] },
  { path:'requests' , component: RequestsComponent, canActivate: [RouteGuardService] },

  
  { path:'**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
