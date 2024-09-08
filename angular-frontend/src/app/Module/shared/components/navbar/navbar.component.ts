import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavContentComponent } from "./nav-content/nav-content.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, CommonModule, NavContentComponent, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isNavbarContentOpen:any
  currentSection:string | null = null

  constructor(private router:Router){}
  
  openNavbarContent(section:string){
    this.isNavbarContentOpen=true;
    this.currentSection=section;
  }

  closeNavbarContent(){
    this.isNavbarContentOpen=false;
  }

  navigateTo(path:any){
    this.router.navigate([path])
  }

  @HostListener('document:click',[`$event`])
  onDocumentClick(event:MouseEvent){
    const modelContainer=document.querySelector('.model-container');
    const openButtons=document.querySelectorAll('.open-button');
    let clickInsideButton=false;

    openButtons.forEach((button:Element)=>{
      if(button.contains(event.target as Node)){
        clickInsideButton=true;
      }
    })

    if(modelContainer && !clickInsideButton && this.isNavbarContentOpen){
      this.closeNavbarContent();
    }
  }


}