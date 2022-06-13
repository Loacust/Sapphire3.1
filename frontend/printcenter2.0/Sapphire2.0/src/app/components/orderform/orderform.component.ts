import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-orderform',
  templateUrl: './orderform.component.html',
  styleUrls: ['./orderform.component.scss']
})
export class OrderformComponent implements OnInit {
  data: string = this.usersService.current_user_email(); //retrieves and stores current user email
  imageFile: any = []; //AUTODOWNLOAD
  orders:any;
  sizes: any = ['4x4','4x6','5x7','8x8','Wallet','8x10'];
  quantity: any = ['1','2','3','4','5','6','7','8','9','10'];

  
  constructor(private usersService:UsersService,public formBuilder:FormBuilder) { 
    this.orders= formBuilder.group({
      sizes: ['',[Validators.required]],
      quantity: ['',[Validators.required]]
      
    })
  }

  ngOnInit(): void { 
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
  }
orderNow(){
  

}

}
