import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { CartItemComponent } from "../../../shared/components/cart-item/cart-item.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatDividerModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cart=[1,1,1]

  constructor(private router:Router){}

  naviageToCheckout(){
    this.router.navigate(["checkout"])
  }

}
