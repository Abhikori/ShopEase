import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-card',
  standalone: true,
  imports: [],
  templateUrl: './order-card.component.html',
  styleUrl: './order-card.component.scss'
})
export class OrderCardComponent {
  
  constructor(private router:Router){}

  navigateToOrderDetails=(id:Number)=>{
    this.router.navigate([`orders/${id}`])
  }

}
