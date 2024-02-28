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
    return this.cart;
  }

  removeFromCart(training : Training){
    if(this.cart.has(training.id)){
      const existTraining = this.cart.get(training.id);
      if(existTraining){
        existTraining.quantity--;
      }
    }else{
      this.cart?.delete(training.id);
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
}
