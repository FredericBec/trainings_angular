import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart :  Map<number, Training>;
  customer : Customer;
  customers : Map<string, Customer>;

  constructor() {
    this.cart = new Map<number, Training>();
    this.customer = new Customer('','','','','');
    this.customers = new Map<string, Customer>();
  }

  addTraining(training : Training){
    if(this.cart.has(training.id)){
      const existTraining = this.cart.get(training.id);
      if(existTraining && (existTraining.quantity >= 1 || existTraining.quantity < 10)){
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

  clearCart(){
    this.cart.clear();
  }

  getCartData(){
    const cartData = localStorage.getItem('cart');
    if(cartData){
      const cartEntries = JSON.parse(cartData);
      const cartMap = new Map<number, Training>(cartEntries);
      return cartMap;
    }else {
      return null;
    }
  }

  addCustomer(customer : Customer){
    const existCustomer = this.customers.get(customer.name);
    if(!existCustomer){
      this.customers.set(customer.name, customer);
    }
    let customers = JSON.stringify(Array.from(this.customers.entries()));
    localStorage.setItem('customers', customers);
    console.log(customers);
  }

  getCustomer(){
    const customerData = localStorage.getItem('customers');
    if(customerData){
      const customerEntries = JSON.parse(customerData);
      const customerMap = new Map<string, Customer>(customerEntries);
      const lastEntry = Array.from(customerMap.values()).pop();
      return lastEntry;
    }else {
      return this.customer;
    }
  }
}
