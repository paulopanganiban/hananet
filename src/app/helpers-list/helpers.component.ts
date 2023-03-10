import { Component, OnInit } from '@angular/core';
import { ProductService } from '../demo/service/productservice';
import { Product } from '../demo/domain/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DriverService } from '../_services/driver.service';
import { MessageService } from 'primeng/api';
import { HelperService } from '../_services/helper.service';

@Component({
  selector: 'app-helpers',
  templateUrl: './helpers.component.html',
  styleUrls: ['./helpers.component.scss']
})
export class HelpersComponent implements OnInit{

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder,
    public helperService: HelperService,
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
    this.helperService.addDriver({
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
