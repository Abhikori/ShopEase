import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AddressCardComponent } from '../../../../shared/components/address-card/address-card.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderService } from '../../../../../State/Order/order.service';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    AddressCardComponent,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss',
})
export class AddressFormComponent {
  addresses = [1, 1, 1];

  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private orderService:OrderService) {
    this.myForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      mobile: ['', Validators.required],
    });
  }

  handleCreateOrder(item: any) {}

  handleSubmit = () => {
    const formValue = this.myForm.value;
    this.orderService.createOrder(formValue)
    console.log(formValue);
  };
}
