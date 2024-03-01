import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer.model';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  cart : Map<number, Training>;
  total : number | undefined;
  customer : Customer;
  constructor(private cartService : CartService) { 
    this.cart = new Map<number, Training>();
    this.customer = new Customer('','','','','');
  }

  ngOnInit(): void {
    this.takeOrder();
  }
  
  takeOrder(){
    const existData = this.cartService.getCartData();
    if(existData){
      this.cart = existData;
    }
    this.total = this.cartService.totalCart();
    const customerInfo = this.cartService.getCustomer();
    if(customerInfo){
      this.customer = customerInfo;
    }
    this.cartService.clearCart();

  }
}
