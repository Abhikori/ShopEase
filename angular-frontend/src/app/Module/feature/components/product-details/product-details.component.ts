import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProductReviewCardComponent } from './product-review-card/product-review-card.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { mens_shirt } from '../../../../../Data/Men/men_shirt';
import { StarRatingComponent } from '../../../shared/components/star-rating/star-rating.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';
import { CartService } from '../../../../State/Cart/cart.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatRadioModule,
    CommonModule,
    FormsModule,
    MatButtonModule,
    ProductReviewCardComponent,
    MatProgressBarModule,
    ProductCardComponent,
    StarRatingComponent,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  selectedSize: any;
  reviews = [1, 1, 1, 1, 1];
  relatedProducts: any;
  product: any;
  productId: any;
  quantity: number = 1;

  constructor(
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.relatedProducts = mens_shirt;
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.findProductsById(id);
    this.productId=id;
    this.store.pipe(select((store) => store.product)).subscribe((product) => {
      this.product = product?.product;
      console.log(this.product);
    });
  }

  handleAddToCart() {
    console.log(this.selectedSize);
    const data={size:this.selectedSize,productId:this.productId,quantity:this.quantity}
    this.cartService.addItemToCart(data)
    this.cartService.getCart()
    this.router.navigate(['cart']);
  }
}
