import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { Store } from '../interfaces/store.interface';

@Injectable({
  providedIn: 'root'
})
export class ScrapService {

  private apiUrl: string = 'http://localhost:8080/api/v1/scrap';

  constructor(private http: HttpClient) { }

  findProducts(value: string | null): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/${value}`);
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(`${this.apiUrl}/stores`);
  }

}

