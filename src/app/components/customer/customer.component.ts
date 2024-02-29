import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customer : Customer = new Customer('', '', '', '', '');

  constructor(public cartService : CartService, private router : Router) { }

  ngOnInit(): void {
    const customerInfo = this.cartService.getCustomer();
    if(customerInfo){
      this.customer = customerInfo;
    }
  }

  onSaveCustomer(customer : Customer){
    console.log(customer);
    this.cartService.addCustomer(customer);
    this.router.navigateByUrl('order');
  }
}
