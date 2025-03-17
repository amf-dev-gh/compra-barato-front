import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ScrapService } from '../../services/scrap.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListService } from '../../services/list.service';
import { Store } from '../../interfaces/store.interface';

@Component({
  selector: 'app-compare',
  imports: [RouterLink],
  templateUrl: './compare.component.html',
  styleUrl: './compare.component.css'
})
export class CompareComponent implements OnInit {

  products: Product[] = [];
  selectedProducts: Product[] = [];
  loadTitle: string = 'Estamos buscando en las tiendas disponibles';
  searching: boolean = true;
  orderAsc: boolean = true;
  orderBy: 'name' | 'category' = 'name';
  value:string|null = '';

  cheapestProduct: Product | null = null;
  stores: Store[] = [];

  constructor(private scrapService: ScrapService, private route: ActivatedRoute, private router: Router, private listService: ListService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: param => {
        if (param.get('value')) {
          this.value = param.get('value');
          this.getAllProducts(this.value);
        }
      },
      error: e => {
        console.error("Error al buscar productos", e);
        this.searching = false;
      }
    });
    this.changeLoadTitle();
  }

  getAllProducts(value: string | null) {
    this.scrapService.findProducts(value).subscribe(
      {
        next: p => {
          this.products = p;
          this.searching = false;
          this.products.sort((a, b) =>
            this.orderAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        },
        error: e => {
          console.error("Error: ", e);
          this.searching = false;
        }
      }
    );
  }

  addProduct(product: Product) {
    this.selectedProducts.push(product);
    this.products = this.products.filter(p => p.name !== product.name);
    this.cheapestProduct = this.compare();
  }

  deleteProduct(product: Product) {
    this.selectedProducts = this.selectedProducts.filter(p => p.name !== product.name);
    this.products.push(product);

    this.products.sort((a, b) =>
      this.orderAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    this.cheapestProduct = this.compare();
  }

  orderByName() {
    this.orderBy = 'name';
    this.orderAsc = !this.orderAsc;
    this.products.sort((a, b) =>
      this.orderAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }

  compare(): Product | null {
    if (this.selectedProducts.length < 2) {
      return null;
    }
    const cleanPrice = (price: string) => parseFloat(price.replace(/[^0-9.,]/g, "").replace(",", "."));
    const cheapestProduct = this.selectedProducts.reduce((masBarato, productoActual) =>
      cleanPrice(productoActual.unitPrice) < cleanPrice(masBarato.unitPrice) ? productoActual : masBarato
    );
    return cheapestProduct;
  }

  addToMyList(p: Product) {
    this.listService.addProduct(p);
    this.router.navigate(['/my-list']);
  }

  changeLoadTitle() {
    setTimeout(() => {
      this.loadTitle = "Esto puede demorar unos segundos mas..."
    }, 10000);
  }
}