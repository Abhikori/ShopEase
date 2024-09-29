import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../../../State/Cart/cart.service';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  @Input() cartItem:any;
  @Input() showButton:any;

  constructor(private cartService:CartService) { }

  updateCartItem(number: any){
    console.log(number);
    this.cartService.updateCartItem({cartItemId:this.cartItem.id, data:{quantity:number+this.cartItem.quantity}});
  }

  removeCartItem(){
    this.cartService.removeCartItem(this.cartItem.id);
  }

}
