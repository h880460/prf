import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  create(id: string, name: string, description: string) {
    return this.http.post(
      environment.serverUrl + '/product',
      { id: id, name: name, description: description },
      { responseType: 'text' }
    );
  }

  edit(id: string, name: string, description: string) {
    return this.http.put(
      environment.serverUrl + '/product',
      { id: id, name: name, description: description },
      { responseType: 'text' }
    );
  }

  delete(id: string) {
    return this.http.post(
      environment.serverUrl + '/product/delete',
      { id: id },
      { responseType: 'text' }
    );
  }

  get() {
    return this.http.get(environment.serverUrl + '/product', {
      responseType: 'json',
    });
  }
}
