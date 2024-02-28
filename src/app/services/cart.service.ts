import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart : Array<Training> = [];

  constructor() {}

  addTraining(training : Training){
    this.cart.push(training);
  }
  
  getCart() {
    console.log(this.cart);
    return this.cart;
  }

  removeFromCart(training : Training){
    let index = this.cart.indexOf(training)!;
    this.cart.splice(index, 1);
  }

  totalCart(){
    let total = 0;
    this.cart?.forEach(training => {
      total += training.price * training.quantity;
    });

    return total;
  }
}
