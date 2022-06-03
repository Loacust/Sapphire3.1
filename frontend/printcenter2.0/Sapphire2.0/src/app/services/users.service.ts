import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UsersService {

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

current_user_info(){
  return JSON.parse(localStorage.getItem('currentUser')!);
}

current_user_email(){
let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
let data = currentUser.email;
console.log(data);
return data;
}

Authenticated(){
  return this.current_user_info() ? true: false;
}
}

