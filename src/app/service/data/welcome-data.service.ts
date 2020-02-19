import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class HelloWorldBean {
  constructor(
    public message : string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http : HttpClient
  ) { 
  }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>(`${environment.apiUrl}/hello-world-bean`);
  }

  executeHelloWorldBeanServiceWithPathVariable(name : string) {
    return this.http.get<HelloWorldBean>(`${environment.apiUrl}/hello-world/pv/${name}`);
  }

  
}
