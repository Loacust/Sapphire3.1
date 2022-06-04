import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';



@Component({
selector: 'app-library',
templateUrl: './library.component.html',
styleUrls: ['library.component.scss']
})
export class LibraryComponent implements OnInit {
data:any = this.usersService.current_user_email();

constructor(private usersService:UsersService) { }

ngOnInit()
 {
 this.Auto_download();

   }
	
  Auto_download (){
    var list:any = [];
    let emailData = this.data
    this.usersService.library_download(emailData).subscribe((result)=>{
    list.push(result);
    console.log(list);
    return list
    });
}
}

