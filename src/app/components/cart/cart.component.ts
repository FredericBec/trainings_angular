import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Map<number, Training> | undefined;
  total : number |undefined;

  constructor(private cartService : CartService) {
  }

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.totalCart();

  }

  removeTraining(training : Training){
    this.cartService.removeFromCart(training);
    this.total = this.cartService.totalCart();
  }



}
