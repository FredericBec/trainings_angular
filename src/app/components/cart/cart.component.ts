import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //Struture de données
  cart: Map<number, Training> | undefined;
  total : number |undefined;

  //injection du service et du router
  constructor(private cartService : CartService, private router : Router) {
  }

  //Récupération des données du panier et du montant total du panier depuis le service
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.total = this.cartService.totalCart();

  }

  /**
   * Fonction pour supprimer la formation selectionnée
   * et mise àjour du montant du panier
   * @param training formation selectionnée
   */
  removeTraining(training : Training){
    this.cartService.removeFromCart(training);
    this.total = this.cartService.totalCart();
  }

  /**
   * Permet de naviguer vers le formulaire du nouveau client
   */
  navigateToForm(){
    this.router.navigateByUrl('customer');
  }

}
