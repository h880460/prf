import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/utils/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.product = { id: '', name: '', description: '' };
  }

  saveData() {
    if (
      this.product.id != '' &&
      this.product.name != '' &&
      this.product.description != ''
    ) {
      this.productService
        .create(this.product.id, this.product.name, this.product.description)
        .subscribe(
          (msg) => {
            console.log(msg);
            this.clearForm();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  editData() {
    if (
      this.product.id != '' &&
      this.product.name != '' &&
      this.product.description != ''
    ) {
      this.productService
        .edit(this.product.id, this.product.name, this.product.description)
        .subscribe(
          (msg) => {
            console.log(msg);
            console.log(this.product.id + ' termek sikeresen frissitve');
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  clearForm() {
    this.product = { id: '', name: '', description: '' };
  }
}
