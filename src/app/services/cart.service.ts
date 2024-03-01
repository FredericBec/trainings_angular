import { Injectable } from '@angular/core';
import { Training } from '../model/training.model';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  //Structure de données
  cart :  Map<number, Training>;
  customer : Customer;
  customers : Map<string, Customer>;

  //Initialisation des structure de données
  constructor() {
    this.cart = new Map<number, Training>();
    this.customer = new Customer('','','','','');
    this.customers = new Map<string, Customer>();
  }

  /**
   * Ajout de la formation au panier tout en vérifiant si la formation existe dans le panier
   * si c'est le cas, on ajoute la quantité modifié à la quantité de la formation dans la map cart
   * @param training formation ajoutée
   */
  addTraining(training : Training){
    if(this.cart.has(training.id)){
      const existTraining = this.cart.get(training.id);
      if(existTraining && (existTraining.quantity >= 1 || existTraining.quantity < 10)){
        existTraining.quantity += training.quantity;
      };
    }else{
      this.cart?.set(training.id, training);
    }
    let cart = JSON.stringify(Array.from(this.cart?.entries()))
    localStorage.setItem('cart', cart);
  }
  
  /**
   * Fonction permettant de récupérer les données du panier
   * @returns le panier
   */
  getCart() {
    return this.cart;
  }

  /**
   * Supprime la formation du panier
   * si elle existe dans le panier, la quantité se décrémente 
   * @param training la formation selectionnée
   */
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

  /**
   * Calcule du montant total du panier 
   * en fonction du prix et de la quantité de chaque formation
   * @returns le total du panier
   */
  totalCart(){
    let total = 0;
    this.cart?.forEach(training => {
      total += training.price * training.quantity;
    });

    return total;
  }

  /**
   * Fonction permettant de vider le panier
   */
  clearCart(){
    this.cart.clear();
  }

  /**
  * Récupère les données du panier dans le local storage
  * @returns la structure de données du dernier panier ou null
  */
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

  /**
   * Ajout du client et insertion dans le local storage des données
   * @param customer client avec les infos saisies du formulaire
   */
  addCustomer(customer : Customer){
    const existCustomer = this.customers.get(customer.name);
    if(!existCustomer){
      this.customers.set(customer.name, customer);
    }
    let customers = JSON.stringify(Array.from(this.customers.entries()));
    localStorage.setItem('customers', customers);
    console.log(customers);
  }

  /**
   * Récupère les dernières infos saisies du formulaire depuis le local storage
   * @returns le dernier client saisi
   */
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
