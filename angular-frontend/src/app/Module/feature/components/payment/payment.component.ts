import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AddressCardComponent } from "../../../shared/components/address-card/address-card.component";
import { CartItemComponent } from "../../../shared/components/cart-item/cart-item.component";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,MatDividerModule, AddressCardComponent, CartItemComponent],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  products=[1,1,1,1,1]
}
