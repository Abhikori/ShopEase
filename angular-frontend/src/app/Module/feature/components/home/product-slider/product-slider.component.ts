import { Component, Input } from '@angular/core';
import { HomeProductCardComponent } from "../home-product-card/home-product-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [HomeProductCardComponent, CommonModule],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss'
})
export class ProductSliderComponent {
  @Input() title:any
  @Input() products:any
}
