import { Component } from '@angular/core';
import { MainCarouselComponent } from "./main-carousel/main-carousel.component";
import { ProductSliderComponent } from "./product-slider/product-slider.component";
import { menJeans } from '../../../../../Data/Men/men_jeans';
import { gounsPage1 } from '../../../../../Data/Gouns/gouns';
import { lengha_page1 } from '../../../../../Data/Women/lenghaCholi';
import { kurtaPage1 } from '../../../../../Data/Kurta/kurta';
import { mensShoesPage1 } from '../../../../../Data/Men/shoes';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MainCarouselComponent, ProductSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  menJeans:any
  womenGouns:any
  lenghaCholi:any
  mensKurta:any
  mensShoes:any
  ngOnInit(){
    this.menJeans=menJeans.slice(0,5);
    this.womenGouns=gounsPage1.slice(0,5);
    this.lenghaCholi=lengha_page1.slice(0,5);
    this.mensKurta=kurtaPage1.slice(0,5);
    this.mensShoes=mensShoesPage1.slice(0,5);
  }
}
