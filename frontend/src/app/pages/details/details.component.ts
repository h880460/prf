import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/utils/products.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  product: Product;
  isAdmin = false;

  private routeSub: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {
    this.product = { id: '', name: '', description: '' };
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      // console.log(params);
      // console.log(params['id']);
      this.productService.get().subscribe(
        (res) => {
          (res as Product[]).forEach((element) => {
            if (element.id === params['id']) {
              // console.log(element);
              this.product = element as Product;
            }
          });
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  deleteProduct(id: string) {
    this.productService.delete(id).subscribe(
      (msg) => {
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
