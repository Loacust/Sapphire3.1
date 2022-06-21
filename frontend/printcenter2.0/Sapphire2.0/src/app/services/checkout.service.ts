import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  data: any;
 

  constructor(private http: HttpClient) { }
  
  //post request for payment

  makePayment(stripeToken:any): Observable<any>{
    return this.http.post<any>('http://localhost:4000/checkout',{token:stripeToken})
  }

  order_download(){
    return this.http.get('http://localhost:4000/orderRetrieval');
  }

  current_user_email(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    let data: string = currentUser.email;
    return this.data = data;
    }

    price_download(){
      return this.http.get('http://localhost:4000/priceRetrieval')
    }

    deleteService(orderid: number){
      return this.http.delete('http://localhost:4000/orderDelete/'+ orderid).subscribe(result =>{
       console.log(result);
   }); 
}}
