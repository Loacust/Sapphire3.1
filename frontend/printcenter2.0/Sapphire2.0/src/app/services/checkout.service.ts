import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
 
  constructor(private http: HttpClient) { }
  
  //post request for payment

  makePayment(stripeToken:any): Observable<any>{
    return this.http.post<any>('http://localhost:4000/checkout',{token:stripeToken})
  }
}
