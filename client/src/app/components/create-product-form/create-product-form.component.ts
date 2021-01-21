import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/product.model";
import {ProductsService} from "../../services/products.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

interface Inventary {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-create-product-form',
  templateUrl: './create-product-form.component.html',
  styleUrls: ['./create-product-form.component.css']
})
export class CreateProductFormComponent implements OnInit {

  form: FormGroup;

  inventary: Inventary[] = [
    {value: '• En Stock', viewValue: 'Stock'},
    {value: '• Limitado', viewValue: 'Limitado'},
    {value: '• Agotado', viewValue: 'Agotado'}
  ];

  constructor(
      private formBuilder: FormBuilder,
      private productsService: ProductsService,
      public dialog: MatDialogRef<CreateProductFormComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
    this.form = this.createFormWithBuilder();
  }

  // Create the form builder
  createFormWithBuilder(): FormGroup {
    return this.formBuilder.group({
      name: [''],
      description: [''],
      quantity: [0],
      category: [''],
      price: [0],
      inventary: ['']
    });

  }

  addButton(form: FormGroup) {
    let newProduct = new Product();

    newProduct.name = form.controls.name.value;
    newProduct.description = form.controls.description.value;
    newProduct.quantity = form.controls.quantity.value;
    newProduct.category = form.controls.category.value;
    newProduct.price = form.controls.price.value;
    newProduct.inventary = form.controls.inventary.value;

    this.productsService.createProduct(newProduct);

    this.dialog.close(newProduct);

  }

  editButton(form: FormGroup) {
    console.log(form);
    this.data.name = form.controls.name.value;
    form.controls.quantity.touched ? this.data.quantity = form.controls.quantity.value: null;
    form.controls.description.touched ? this.data.description = form.controls.description.value: null;
    form.controls.category ? this.data.category = form.controls.category.value: null;
    form.controls.price.touched ? this.data.price = form.controls.price.value: null;
    form.controls.inventary.touched ? this.data.inventary = form.controls.inventary.value: null;

    this.productsService.updateProduct(this.data);
    this.dialog.close();
  }

  closeButton() {
    this.dialog.close();
  }

}
