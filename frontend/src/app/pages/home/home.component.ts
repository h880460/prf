import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../utils/connection.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ProductsService } from '../../utils/products.service';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { LoginService } from 'src/app/utils/login.service';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private productService: ProductsService,
    private loginService: LoginService
  ) {
    // console.log(environment);
    this.cloudElements = [];
  }
  ngOnInit(): void {
    this.refreshDb();
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  title = 'PRF';

  cloudElements: Product[];
  isAdmin = false;

  goToAdmin() {
    // localStorage.getItem('isAdmin')
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    }
  }

  refreshDb() {
    this.cloudElements = [];
    this.productService.get().subscribe(
      (res) => {
        // console.log(res);
        (res as Product[]).forEach((product) => {
          // console.log(product)
          this.cloudElements.push({
            id: product.id,
            name: product.name,
            description: product.description,
          });
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToDetails(product: Product) {
    console.log(product.id);
    // this.cloudId = product.id;
    // this.value = product.value;
    this.router.navigate(['/details', product.id]);
  }

  goToProducts() {
    this.router.navigate(['/product']);
  }
}
