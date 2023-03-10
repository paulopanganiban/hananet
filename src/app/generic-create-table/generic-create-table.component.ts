import { Component, OnInit } from '@angular/core';
import { ProductService } from '../demo/service/productservice';
import { Product } from '../demo/domain/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverService } from '../_services/driver.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-generic-create-table',
  templateUrl: './generic-create-table.component.html',
  styleUrls: ['./generic-create-table.component.scss']
})
export class GenericCreateTableComponent implements OnInit{

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    public driverService: DriverService,
    private messageService: MessageService
  ) { }
  display = false
  driverForm: FormGroup
  initialFormValue: FormGroup
  ngOnInit(): void {
    this.initializeForm()
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
