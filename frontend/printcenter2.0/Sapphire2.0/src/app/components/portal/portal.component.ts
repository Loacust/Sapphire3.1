import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { RouterModule, Router } from '@angular/router';




@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  signIn:any;

  constructor(private formBuilder:FormBuilder, private usersService: UsersService, private router:Router) {
    this.signIn = formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(7)]]
    })
   }

  ngOnInit(): void {
  }

  login(){
    let signIn = this.signIn.value;
    this.usersService.login(signIn).subscribe((result) =>{
      this.router.navigate(['']);
      localStorage.setItem('currentUser',JSON.stringify(result)); 
    });
   }

}

