import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureComponent } from './components/feature.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { SharedModule } from '../shared/shared.module';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { OrderComponent } from './components/order/order.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatureComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    ProductDetailsComponent,
    OrderComponent,
    SharedModule,
    PaymentSuccessComponent
  ],
  exports:[
    FeatureComponent,
    HomeComponent,
    ProductsComponent,
  ]
})
export class FeatureModule { }
