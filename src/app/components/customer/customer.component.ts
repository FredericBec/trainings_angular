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

  //Struture de données
  customer : Customer = new Customer('', '', '', '', '');

  //injection du service et du router
  constructor(public cartService : CartService, private router : Router) { }

  //Récupération des dernières infos saisies du client
  ngOnInit(): void {
    const customerInfo = this.cartService.getCustomer();
    if(customerInfo){
      this.customer = customerInfo;
    }
  }

  /**
   * Ajout d'un nouveau client 
   * et navigation vers la page du récapitulatif de la commande
   * @param customer 
   */
  onSaveCustomer(customer : Customer){
    this.cartService.addCustomer(customer);
    this.router.navigateByUrl('order');
  }
}
