import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  Aboutpage() {
    console.log(window.location.href)
    window.open("http://127.0.0.1:8080/About_Us.html","_blank");
  }
  Contactpage() {
    
    window.open("http://127.0.0.1:8080/Contact_Us.html","_blank");
  }
}
