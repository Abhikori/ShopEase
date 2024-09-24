import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from "./signin/signin.component";
import { SignupComponent } from "./signup/signup.component";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, SigninComponent, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  isLoggedIn: boolean = true;

  changeTemplate=()=>{
    this.isLoggedIn = !this.isLoggedIn;
  }

}
