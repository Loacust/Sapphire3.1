import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private userService: UsersService, private router: Router) { }
  canActivate(): boolean {
    if (!this.userService.Authenticated()) {
      this.router.navigate(['portal']);
      return false;
    }
    return true;
  }
}
