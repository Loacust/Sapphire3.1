import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Images } from '../interfaces/images';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
data: any;
  constructor(private http: HttpClient) {}


registration(formData:object){
    return this.http.post('http://localhost:4000/regPost', formData)
  }
login(formData:object){
   return this.http.post('http://localhost:4000/loginPost', formData)
}
photo_upload(formData:any){
  return this.http.post('http://localhost:4000/imagePost', formData)

}
library_download(){
  return this.http.get('http://localhost:4000/imagePost');
}
orders_upload(formData:any){
  return this.http.post('http://localhost:4000/orderInfo',formData);
}


current_user_info(){
  return JSON.parse(localStorage.getItem('currentUser')!);
}

current_user_email(){
let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
let data: string = currentUser.email;
return this.data = data;
}

Authenticated(){
  return this.current_user_info() ? true: false;
}

deleteService(image:string){
   return this.http.delete('http://localhost:4000/'+ image).subscribe(result =>{
    console.log(result);
}); 
}
}
