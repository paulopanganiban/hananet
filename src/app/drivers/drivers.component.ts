import { Component, OnInit } from '@angular/core';
import { ProductService } from '../demo/service/productservice';
import { Product } from '../demo/domain/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverService } from '../_services/driver.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss']
})
export class DriversComponent implements OnInit {

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    public driverService: DriverService,
    private messageService: MessageService
  ) { }
  display = false
  products: Product[];
  cols = [
    { field: 'code', header: 'Code' },
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'quantity', header: 'Quantity' }
  ];

  driverForm: FormGroup
  initialFormValue: FormGroup
  ngOnInit(): void {
    this.initializeForm()
    this.productService.getProductsSmall().then(data => this.products = data);
  }
  initializeForm() {
    this.driverForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      contactNumber: [null, Validators.required],
    })
    this.initialFormValue = this.driverForm.value
  }
  loading = false
  handleAddDriver() {
    this.loading = true
    const { firstName, lastName, contactNumber } = this.driverForm.value
    this.driverService.addDriver({
      firstName, lastName, contactNumber
    }).subscribe((res) => {
      this.loading = false
      this.display = false
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Driver Succesfully Added'
      })
    })
  }
}
