import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  signInStatus:any;
  signIn:any;
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser') != null ){
     this.signIn = true
    }
    else{
   this.signIn = false
    } 
    this.signInStatus= this.signIn
    console.log(this.signIn)
    return this.signInStatus; 
  }
  
  


  homePage() {
    
    window.open("http://127.0.0.1:8080/Index.html","_blank");
  }

  logout(){
    localStorage.removeItem('currentUser');
    location.reload();
    
  }
  loginToggle(){
    setTimeout(() =>
      location.reload(),4500);
      
    
  
    
  }
  
}
