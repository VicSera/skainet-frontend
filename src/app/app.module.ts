import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { ListTripsComponent } from './list-trips/list-trips.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TripComponent } from './trip/trip.component';
import { HttpInterceptorBasicAuthenticationService } from './service/http-interceptor-basic-authentication.service';
import { RegisterComponent } from './register/register.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RequestsComponent } from './requests/requests.component';
import { EditableTripComponent } from './trip/editable-trip/editable-trip.component';
import { ReadonlyTripComponent } from './trip/readonly-trip/readonly-trip.component';
import { RequestPanelComponent } from './trip/request-panel/request-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    ErrorComponent,
    ListTripsComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    TripComponent,
    RegisterComponent,
    RequestsComponent,
    EditableTripComponent,
    ReadonlyTripComponent,
    RequestPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpInterceptorBasicAuthenticationService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
