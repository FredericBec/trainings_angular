import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart :  Map<number, Training>;

  constructor() {
    this.cart = new Map<number, Training>();
  }

  addTraining(training : Training){
    this.cart?.set(training.id, training);
    let cart = JSON.stringify(Array.from(this.cart?.entries()))
    localStorage.setItem('cart', cart);
  }
  
  getCart() {
    return this.cart;
  }

  removeFromCart(training : Training){
    this.cart?.delete(training.id);
  }

  totalCart(){
    let total = 0;
    this.cart?.forEach(training => {
      total += training.price * training.quantity;
    });

    return total;
  }
}
