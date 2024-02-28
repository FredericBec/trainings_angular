import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Training } from 'src/app/model/training.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

  listTrainings : Training[] | undefined;

  constructor(private cartService : CartService, private router : Router) { }

  ngOnInit(): void {
    this.listTrainings = [
      {id : 1, name : "Java", description : "Formation java SE8", duration : 5, price : 1500, quantity : 1},
      {id: 2, name : "Dotnet", description : "Fromation DotNet", duration : 3, price : 1000, quantity : 1},
      {id: 3, name : "Python", description : "Formation Python/Django", duration : 5, price : 1500, quantity : 1},
    ];
  }

  onAddToCart(training : Training){
    this.cartService.addTraining(training);
    this.router.navigateByUrl('cart');
  }

}
