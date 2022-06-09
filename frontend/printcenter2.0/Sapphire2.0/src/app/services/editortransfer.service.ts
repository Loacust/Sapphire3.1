
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditortransferService {

  private messageSource = new BehaviorSubject<string>("default massage");
  currentMessage = this.messageSource.asObservable();

  constructor(private router:Router) {  }
  
  changeMessage(message: string){
    this.messageSource.next(message)
  }

}
