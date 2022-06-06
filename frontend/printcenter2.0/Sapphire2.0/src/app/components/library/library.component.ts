import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';



@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['library.component.scss']
})
export class LibraryComponent implements OnInit {
  data: any = this.usersService.current_user_email();
  imageFile: any = [];
  constructor(private usersService: UsersService) { }
  
  ngOnInit() {
    let imageList: any = [];
    let list: any = [];
    this.usersService.library_download().subscribe((result) => {
      list.push(result);
      let i = 0
      for (i = 0; i < 20; i++) {
        if (list[0][i].email == this.data) {
          imageList.push(list[0][i].image)
        }
      }
    })
    console.log(imageList)
    this.imageFile = imageList;
    
  };
  testArray(){
  console.log(this.imageFile)
  }
  

}


