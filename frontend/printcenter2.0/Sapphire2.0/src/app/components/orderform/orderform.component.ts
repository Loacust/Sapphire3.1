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
  size: any = ['4x4','4x6','5x7','8x8','Wallet','8x10'];
  quantity: number[] = [1,2,3,4,5,6,7,8,9,10];
  price!: string;
  
  constructor(private usersService:UsersService,public formBuilder:FormBuilder) { 
    this.orders= formBuilder.group({
      size: ['',[Validators.required]],
      quantity: [,[Validators.required]],
      email: [this.data,[Validators.required]],
      photoid:['',[Validators.required]],
      price:[,[Validators.required]]
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
  }

/*priceChange(event:any){
  let currentSelectedSize =this.orders.size;
  console.log(currentSelectedSize);

}*/
addToCart(image: string){
  let price = this.priceMethod(this.orders.value.quantity, this.orders.value.size);
  this.orders.patchValue({
    photoid: image
  });
  this.orders.patchValue({
    price: price
  });
  let formData = this.orders.value;
  this.usersService.orders_upload(formData).subscribe(function () {
    alert("Upload Successful");
  })
 location.reload();
  
}
priceMethod(quantity: number, size: string){
    if (size === "4x4"){
      let total = (quantity*0.500).toFixed(2);
      
      return total
    }
    if (size === "4x6"){
      let total = (quantity*0.55).toFixed(2)

      return total
    }
    if (size === "5x7"){
      let total = (quantity*0.60).toFixed(2)

      return total
    }
    if (size === "8x8"){
      let total = (quantity*0.75).toFixed(2)

      return total
    }
    if (size === "8x10"){
      let total = (quantity*1.00).toFixed(2)

      return total
    }
    if (size === "Wallet"){
      let total = (quantity*0.25).toFixed(2)

      return total
    }
    else return 0

  
}


}
