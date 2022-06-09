import { Component, Input, OnInit, Output } from '@angular/core';
import { EditortransferService } from 'src/app/services/editortransfer.service';
import { UsersService } from 'src/app/services/users.service';
import { RouterModule, Routes, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';



@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['library.component.scss']
})
export class LibraryComponent implements OnInit {

  
  
  data: string = this.usersService.current_user_email(); //retrieves and stores current user email
  imageFile: any = []; //AUTODOWNLOAD
  message!:string; //DATASHARE

  @Output() messageEvent = new EventEmitter<string>();
  
constructor(private usersService: UsersService, private router:Router,private image:EditortransferService) { 
    
   
  }
//DATASHARE
//broadcast image filename to editor and edit-page and then navigate ti edit-page 
sendMessage(image:string){
this.image.changeMessage(image);
console.log(image);
this.router.navigate(['edit-page']);


 }



  ngOnInit() {
  this.image.currentMessage.subscribe(message => this.message = message);


    //AUTODOWNLOAD
    // automatically download and display the users online library 
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
  //DELETE 
  //removes images from current users online library
  deleteImage(fileName: any){
    console.log(fileName);
    this.usersService.deleteService(fileName);
    window.location.reload();
    

  }

    
  
    
//  }
  passIndexValue(i: number){
    console.log(i)//clicked index
 }
 
    }

 
