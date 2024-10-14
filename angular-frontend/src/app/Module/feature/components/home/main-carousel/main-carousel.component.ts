import { Component, OnDestroy, OnInit } from '@angular/core';
import { homeCarouselData } from '../../../../../../Data/mainCarousel';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-carousel',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss'] 
})
export class MainCarouselComponent {
  carouselData : any; 
  currentSlide = 0;
  interval: any;

  ngOnInit() {
    this.carouselData=homeCarouselData
    this.autoPlay()
  }

  autoPlay() {
    
    setInterval(() => {
      this.nextSlide();
    }, 2000); // Change slide every 2 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
    
  }

  
}
