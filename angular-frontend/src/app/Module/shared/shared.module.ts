import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    CartItemComponent,
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    ProductCardComponent,
    CartItemComponent
  ]
})
export class SharedModule { }
