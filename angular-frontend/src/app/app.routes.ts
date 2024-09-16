import { Routes } from '@angular/router';
import { HomeComponent } from './Module/feature/components/home/home.component';
import { ProductsComponent } from './Module/feature/components/products/products.component';
import { CartComponent } from './Module/feature/components/cart/cart.component';
import { ProductDetailsComponent } from './Module/feature/components/product-details/product-details.component';
import { CheckoutComponent } from './Module/feature/components/checkout/checkout.component';
import { PaymentComponent } from './Module/feature/components/payment/payment.component';
import { PaymentSuccessComponent } from './Module/feature/components/payment-success/payment-success.component';
import { OrderComponent } from './Module/feature/components/order/order.component';
import { OrderDetailsComponent } from './Module/feature/components/order-details/order-details.component';

export const routes: Routes = [
    {path:"",component: HomeComponent},
    {path:"products",component: ProductsComponent},
    {path:"cart",component: CartComponent},
    {path:"product-details/:id",component: ProductDetailsComponent},
    {path:"checkout",component: CheckoutComponent},
    {path:"checkout/payment/:id",component: PaymentComponent},
    {path:"payment-succcess",component: PaymentSuccessComponent},
    {path:":levelOne/:levelTwo/:levelThree",component: ProductsComponent},
    {path:"order-summary",component: ProductsComponent},
    {path:"account/orders",component: OrderComponent},
    {path:"order/:Id",component: OrderDetailsComponent},
    {path:"admin",loadChildren: () => import('./Module/admin/admin-routing.module').then(m => m.AdminRoutingModule)}
];
