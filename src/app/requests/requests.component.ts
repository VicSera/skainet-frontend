import { Component, OnInit } from '@angular/core';
import { JoinRequest } from '../classes/request';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  // private requests: JoinRequest[]
  private requests: JoinRequest[] = []

  constructor() { }

  ngOnInit() {
  }

}
