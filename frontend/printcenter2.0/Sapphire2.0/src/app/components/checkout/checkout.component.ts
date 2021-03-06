
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CheckoutService } from 'src/app/services/checkout.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  //Stripe
  paymenthandler: any = null;
  success: boolean = false;
  failure: boolean = false;
  //Orders Retreival
  data: string = this.checkout.current_user_email();
  photoFile: any = [];
  quantityFile: any = [];
  sizeFile: any = [];
  fullOrder: any = [];
  totalPrice!: string;
  priceList: any =[];
  total: any;
  intTotal!: number;
  taxTotal: any;
  intTaxTotal!:number;
  finalTotal: any;
  intFinalNumber!: number;


  constructor(private checkout: CheckoutService, private router: Router) { }

  ngOnInit(): void {
    //Stripe
    this.invokeStripe();

    //current order
    this.orderRetrieval();
  
    //Price total retrieval
    this.priceTotal();

    
     }


///STRIPE

  makepayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L9uu6ARDzLUzTUFCG2Bc4f3TR61BYSLdfJo772Wp3uKg5Jk5gb1N1otmcOi2x4Rg8ztGdGSLyM7fMfqqKg9BABP00ygjWD9Qk',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log(stripeToken);
        paymentStripe(stripeToken);
      }
    });
    const paymentStripe = (stripeToken: any) => {
      this.checkout.makePayment(stripeToken).subscribe((data: any) => {
        console.log(data);
        if (data.data === "success") {
          this.success = true
          this.router.navigate(['thankyou']);
        }
        else {
          this.failure = true
        }
      });
    };

    paymentHandler.open({
      name: 'Sapphire Digital',
      description: "Prints Order",
      amount: this.intFinalNumber*100,
    });

  }


  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymenthandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L9uu6ARDzLUzTUFCG2Bc4f3TR61BYSLdfJo772Wp3uKg5Jk5gb1N1otmcOi2x4Rg8ztGdGSLyM7fMfqqKg9BABP00ygjWD9Qk',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
          },
        });
      };
      window.document.body.appendChild(script);
    }
  }
 
  //Order retreival

  orderRetrieval(){
    let orders: any = [];
    let singleOrder: any = [];
    this.checkout.order_download().subscribe((result) => {
      orders.push(result);

      let i = 0
      for (i = 0; i < orders[0].length; i++) {
        if (orders[0][i].email == this.data) {
          singleOrder.push(orders[0][i])
        }
      }
    })
    this.fullOrder = singleOrder;
  
  }
  priceTotal(){
    let wholeList: any = [];
    let singleOrder: any = [];
    this.checkout.price_download().subscribe((result) => {
      wholeList.push(result)
    
      let i = 0
      for (i = 0; i < wholeList[0].length; i++) {
        if (wholeList[0][i].email == this.data) {
          singleOrder.push(wholeList[0][i].price);
        }
      
       this.priceList=singleOrder;
      
       }
       
      var x = 0
      let tempTotal = 0
      while(x<this.priceList.length){
        this.priceList[x] = parseFloat(this.priceList[x]);
        tempTotal = tempTotal + this.priceList[x];
        x++
       };
     
      this.total = tempTotal.toFixed(2);
      this.intTotal = tempTotal;
      this.taxCalc();
      this.Total();
    })
  } 

  // Calculates tax
  taxCalc(){
    let localTax = this.intTotal*0.05;
    this.taxTotal = localTax.toFixed(2);
    this.intTaxTotal = localTax
  }
  //Calculates final total
  Total(){
    let localTotal = this.intTaxTotal + this.intTotal;
    this.finalTotal = localTotal.toFixed(2);
    this.intFinalNumber = localTotal
  }

  deleteOrder(orderid: number) {
    console.log(orderid);
    this.checkout.deleteService(orderid);
    location.reload();


  }
}
