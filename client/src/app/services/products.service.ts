import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Product} from "../models/product.model";
import ListManager from '../utils/listManager';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  readonly API_URL = 'http://localhost:8080/api/products';
  public products: Product[];
  public product: Product;

  constructor(private http: HttpClient) { }

  public async getProducts() {
    try {
      let response = await this.http
        .get(this.API_URL)
        .toPromise();
      this.products = response as Product[];
      return response;
    } catch (error) {
      console.log("Error calling all the Products");
    }
  }

  public async createProduct(body: Product) {
    try {
      let response = await this.http
        .post(this.API_URL + "/", body)
        .toPromise();
      this.product = response as Product;
      // Modifying the trips in the service
      this.products = (new ListManager(this.products)).updateList(this.products);
      //await this.getProducts();
    } catch(err) {
      console.log("Error creating the trip");
      console.log(err);
    }
  }

  public async deleteProduct(id: String) {
    try {
      let response = await this.http
        .delete(this.API_URL + "/" + id)
        .toPromise();
      this.product = response as Product;
      // -- Modifying the trips in the service
      this.products = (new ListManager(this.products)).updateList(this.product);
    } catch(err) {
      console.log("Problems deleting the product with id: (" + id + ")");
      console.log(err);
    }
  }

  public async updateProduct(productArg: Product) {
    try {
      let response = await this.http
        .put(this.API_URL + "/" + productArg._id.valueOf(), productArg)
        .toPromise();
      this.product = response as Product;
      // -- Modifying the trips in the service
      this.products = (new ListManager(this.products)).updateList(this.product);
      console.log('Logro updatear');
    } catch (err) {
      console.log("Error calling the product with id: (" + productArg._id + ")");
      console.log(err);
    }
  }
}
