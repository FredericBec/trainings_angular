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

  //Structure de données
  cart : Map<number, Training>;
  total : number | undefined;
  customer : Customer;

  //initialisation des structure de données et injection du service
  constructor(private cartService : CartService) { 
    this.cart = new Map<number, Training>();
    this.customer = new Customer('','','','','');
  }

  //Initialisation de la méthode takeOrder
  ngOnInit(): void {
    this.takeOrder();
  }
  
  /**
   * Permet de récupérer les infos du panier et du client depuis le service
   * et de les injecter dans le template du composant
   */
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
