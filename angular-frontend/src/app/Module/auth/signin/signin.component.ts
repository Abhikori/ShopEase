import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../State/Auth/auth.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {

  @Input() changeTemplate:any

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store, private authService:AuthService) {
   
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitForm():void{
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value);
      console.log(this.loginForm.value);
    }
  }

}
