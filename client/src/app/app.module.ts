import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from "@angular/material/sidenav";
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { ProductsService } from './services/products.service';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { CreateProductFormComponent } from './components/create-product-form/create-product-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatSelectModule} from "@angular/material/select";
import { ProductNameComponent } from './components/product-name/product-name.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsTableComponent,
    CreateProductFormComponent,
    ConfirmDialogComponent,
    ProductNameComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatSidenavModule,
        MatTableModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule

    ],
  providers: [ProductsService],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmDialogComponent,
    CreateProductFormComponent
  ]
})
export class AppModule { }
