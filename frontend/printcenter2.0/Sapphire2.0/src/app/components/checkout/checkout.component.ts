
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  paymenthandler: any = null;

  success: boolean = false;

  failure: boolean = false;
  constructor(private checkout: CheckoutService) { }

  ngOnInit(): void {
    this.invokeStripe();
  }
  makepayment(amount: number) {
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
        }
        else {
          this.failure = true
        }
      });
    };
  
    paymentHandler.open({
    name: 'Sapphire Digital',
    description:"4x6 Photo",
    amount: amount * 100,
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
}