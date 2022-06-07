import { Component, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { RouterModule, Routes, Router } from '@angular/router';



@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['library.component.scss']
})
export class LibraryComponent implements OnInit {
  
  
  data: string = this.usersService.current_user_email();
  imageFile: any = [];


  
constructor(private usersService: UsersService, private router:Router) { 
    
   
  }
 





  ngOnInit() {
    let imageList: any = [];
    let list: any = [];
    this.usersService.library_download().subscribe((result) => {
      list.push(result);
      let i = 0
      for (i = 0; i < list[0].length; i++) {
        if (list[0][i].email == this.data) {
          imageList.push(list[0][i].image)
        }
      }
    })
    this.imageFile = imageList;   
    console.log(this.imageFile)
  };

  deleteImage($event: any){
    const fileName = $event.target.value;
    console.log(fileName, this.data);
    this.usersService.deleteService(fileName);
    this.router.navigate(['library']);
    

  }


    }

 
