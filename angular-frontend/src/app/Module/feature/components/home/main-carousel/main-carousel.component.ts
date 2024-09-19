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
export class MainCarouselComponent implements OnInit, OnDestroy {
  carouselData : any; // Initialized here directly
  currentSlide = 0;
  interval: any;

  ngOnInit() {
    this.carouselData=homeCarouselData
    // this.autoPlay()
  }

  autoPlay() {
    // Clear any existing interval to prevent multiple intervals from running
    // if (this.interval) {
    //   clearInterval(this.interval);
    // }

    setInterval(() => {
      this.nextSlide();
    }, 2000); // Change slide every 2 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselData.length;
    // console.log(this.currentSlide)
  }

  ngOnDestroy() {
    // if (this.interval) {
    //   clearInterval(this.interval); // Clean up interval on component destruction
    // }
  }
}
