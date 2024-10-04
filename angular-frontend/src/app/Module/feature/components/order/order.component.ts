import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderCardComponent } from "./order-card/order-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, OrderCardComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  orderFilter=[
    {value: 'on_the_way', label:"On the Way"},
    {value: 'delivered', label:"Delivered"},
    {value: 'on_the_way', label:"On the Way"},
    {value: 'cancelled', label:"Cancelled"},
    {value: 'returned', label:"Returned"},
  ];
  orders=[[1,1],[1,1]]

  constructor(private router:Router){}

  navigateToOrderDetails=(id:Number)=>{
    this.router.navigate([`/order/${id}`])
  }
}
