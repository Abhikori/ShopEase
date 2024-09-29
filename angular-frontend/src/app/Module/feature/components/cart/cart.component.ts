import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { CartItemComponent } from "../../../shared/components/cart-item/cart-item.component";
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../../../State/Cart/cart.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CartItemComponent, MatDividerModule, MatButtonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cart=[1,1,1];
  cartItems:any;

  constructor(private router:Router,private cartService:CartService,private store:Store<AppState>){}

  ngOnInit(){
    this.cartService.getCart()

    this.store.pipe(select((store) => store.cart)).subscribe((cart) => {
      this.cartItems = cart.cartItems;
      console.log(this.cartItems);
    });
  }

  naviageToCheckout(){
    this.router.navigate(["checkout"])
  }

}
