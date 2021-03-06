import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  Users: any;
  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private router: Router) {
    this.Users = formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    })
  }

  ngOnInit(): void {
  }

  register() {
    this.usersService.registration(this.Users.value).subscribe((result)=> {
      console.log(result);
      this.router.navigate(['portal']);
      alert("User Added Successfully");
  
    });
  }
}
