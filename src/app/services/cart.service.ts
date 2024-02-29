import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart :  Map<number, Training>;
  customer : Customer;
  customers : Map<number, Customer>;

  constructor() {
    this.cart = new Map<number, Training>();
    this.customer = new Customer(0, '', '', '', '', '');
    this.customers = new Map<number, Customer>();
  }

  addTraining(training : Training){
    if(this.cart.has(training.id)){
      const existTraining = this.cart.get(training.id);
      if(existTraining){
        existTraining.quantity++;
      };
    }else{
      this.cart?.set(training.id, training);
    }
    let cart = JSON.stringify(Array.from(this.cart?.entries()))
    localStorage.setItem('cart', cart);
  }
  
  getCart() {
    console.log(this.cart);
    return this.cart;
  }

  removeFromCart(training : Training){
    const existTraining = this.cart.get(training.id);
    if(this.cart.has(training.id)){
      if(existTraining){
        existTraining.quantity--;
        if(existTraining.quantity <= 0){
          this.cart.delete(training.id);
        }
      }
    }
    
    let cart = JSON.stringify(Array.from(this.cart?.entries()))
    localStorage.setItem('cart', cart);
  }

  totalCart(){
    let total = 0;
    this.cart?.forEach(training => {
      total += training.price * training.quantity;
    });

    return total;
  }

  addCustomer(customer : Customer){
    this.customer = customer;
    const existCustomer = this.customers.get(customer.id);
    if(!existCustomer){
      this.customers.set(customer.id, customer);
    }
    let customers = JSON.stringify(Array.from(this.customers.entries()));
    localStorage.setItem('customers', customers);
    console.log(customers);
  }

  getCustomer(){
    return this.customer;
  }
}
