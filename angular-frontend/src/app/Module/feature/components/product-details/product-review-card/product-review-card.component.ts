import { Component } from '@angular/core';
import { StarRatingComponent } from "../../../../shared/components/star-rating/star-rating.component";

@Component({
  selector: 'app-product-review-card',
  standalone: true,
  imports: [StarRatingComponent],
  templateUrl: './product-review-card.component.html',
  styleUrl: './product-review-card.component.scss'
})
export class ProductReviewCardComponent {

}
