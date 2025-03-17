import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  private productsSubject = new BehaviorSubject<Product[]>(this.loadFromStorage());
  products$ = this.productsSubject.asObservable();

  private saveToStorage(products: Product[]) {
    localStorage.setItem('productsList', JSON.stringify(products));
  }

  private loadFromStorage(): Product[] {
    const data = localStorage.getItem('productsList');
    return data ? JSON.parse(data) : [];
  }

  getList(): Product[] {
    return this.productsSubject.getValue();
  }

  addProduct(product: Product) {
    const currentList = this.getList();
    const updatedList = [...currentList, product];
    this.productsSubject.next(updatedList);
    this.saveToStorage(updatedList);
  }

  deleteProduct(name: string) {
    const currentList = this.getList();
    const updatedList = currentList.filter(p => p.name !== name);
    this.productsSubject.next(updatedList);
    this.saveToStorage(updatedList);
  }

  clear(){
    localStorage.clear();
  }
}
