import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { filters, singleFilter } from './filterData';
import { MatRadioModule } from '@angular/material/radio';
import { mensPantsPage1 } from '../../../../../Data/pants/me_page1';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../Models/AppState';
import { mens_kurta } from '../../../../../Data/Men/men_kurta';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    ProductCardComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  filterData: any;
  singleFilterData: any;
  products: any;
  levelThree: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private store:Store<AppState>
  ) {}

  ngOnInit() {
    this.filterData = filters;
    this.singleFilterData = singleFilter;
    this.activatedRoute.paramMap.subscribe((params) => {
      this.levelThree=params.get('levelThree')
      var reqData = {
        category: params.get('levelThree')||'',
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 10000,
        minDiscount: 0,
        pageNumber: 0,
        pageSize: 10,
        stock: null,
      };
      // this.productService.findProductsByCategory(reqData);
      this.matchingLevelThree(reqData.category);
    });

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      const color=params["color"];
      const size=params["size"];
      const price=params["price"];
      const discount=params["disccout"];
      const stock=params["stock"];
      const sort=params["sort"];
      const pageNumber=params["pageNumber"];
      const minPrice=price?.split("-")[0];
      const maxPrice=price?.split("-")[1];
    
      var reqData = {
        category: this.levelThree,
        colors: color?[color].join(","):[],
        sizes: size,
        minPrice: minPrice?minPrice:0,
        maxPrice: maxPrice?maxPrice:10000,
        minDiscount: discount?discount:0,
        pageNumber: pageNumber?pageNumber:0,
        pageSize: 10,
        stock: null,
      };
      console.log(reqData)
      // this.productService.findProductsByCategory(reqData);
      this.matchingLevelThree(reqData.category);


    });

    this.activatedRoute.queryParams.subscribe(params => {
      this.applyFilters(params);  // Apply filters when query params change
    });

    // this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
    //   this.products=product.products.content;
    // })
  }

  matchingLevelThree(levelThree: string) {
    if (levelThree === 'mens_kurta') {
      this.products = mens_kurta;  // Assign the array of products
    } else if (levelThree === 'mens_pants') {
      this.products = mensPantsPage1;  // Assign the array of pants products
    }
  }

  applyFilters(params: any) {
    const color = params["color"] ? params["color"].split(',') : [];
    const size = params["size"];
    const price = params["price"];
    const discount = params["discount"]; // Fixed typo
    const stock = params["stock"];
    const minPrice = price ? +price.split("-")[0] : 0;
    const maxPrice = price ? +price.split("-")[1] : 10000;

    this.products = this.products.filter((product: any) => {
      // Color filter
      const colorMatch = color.length === 0 || color.includes(product.color);
      // Size filter
      const sizeMatch = !size || product.size === size;
      // Price filter
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      // Discount filter
      const discountMatch = !discount || product.discount >= +discount;
      // Stock filter
      const stockMatch = !stock || product.stock === stock;

      // Return true if all filters match
      return colorMatch && sizeMatch && priceMatch && discountMatch && stockMatch;
    });
  }
  

  handleMultipleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    const filterValues = queryParams[sectionId]
      ? queryParams[sectionId].split(',')
      : [];
    const valueIndex = filterValues.indexOf(value);
    if (valueIndex != -1) {
      filterValues.splice(valueIndex, 1);
    } else {
      filterValues.push(value);
    }

    if (filterValues.length > 0) {
      queryParams[sectionId] = filterValues.join(',');
    } else {
      delete queryParams[sectionId];
    }

    this.router.navigate([], { queryParams });
  }

  handleSingleSelectFilter(value: string, sectionId: string) {
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    queryParams[sectionId] = value;

    this.router.navigate([], { queryParams });
  }
}
