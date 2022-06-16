import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  qrInfoDem = [{
    'email': 'janson92@gmail.com',
    'order': '#2334',  
  }]
  qrInfo = JSON.stringify(this.qrInfoDem);

  

  constructor() { }

  ngOnInit(): void {
  }

}
