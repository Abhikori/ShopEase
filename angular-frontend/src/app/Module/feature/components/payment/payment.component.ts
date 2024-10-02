import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { AddressCardComponent } from '../../../shared/components/address-card/address-card.component';
import { CartItemComponent } from '../../../shared/components/cart-item/cart-item.component';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../State/Order/order.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';
import { PaymentService } from '../../../../State/Payment/payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    AddressCardComponent,
    CartItemComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent {
  products = [1, 1, 1, 1, 1];
  order: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private store: Store<AppState>,
    private paymentService: PaymentService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) this.orderService.getOrderById(id);

    this.store.pipe(select((store) => store.order)).subscribe((order) => {
      this.order = order.order;
    });
  }

  redirectToPayment = () => {
    if(this.order.id)
      this.paymentService.createPayment(this.order.id);
  }
}
