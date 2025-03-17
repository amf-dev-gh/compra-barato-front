import { Component, OnInit } from '@angular/core';
import { Store } from '../../interfaces/store.interface';
import { ScrapService } from '../../services/scrap.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stores',
  imports: [ReactiveFormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  searchForm: FormGroup;
  stores: Store[] = [];

  constructor(private scrapService: ScrapService, private fb:FormBuilder, private router:Router) {
    this.searchForm = this.fb.group({
      value: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
      ]]
    })
  }

  ngOnInit(): void {
    this.getStoresInfo();
  }

  getStoresInfo() {
    this.scrapService.getStores().subscribe({
      next: s => {
        this.stores = s;
      },
      error: e => console.error("Error al obtener tiendas", e)
    })
  }
  
  search() {
    const value = this.searchForm.get('value')?.value;
    this.router.navigate([`/compare/${value}`]).then(() => this.searchForm.reset());
  }

}
