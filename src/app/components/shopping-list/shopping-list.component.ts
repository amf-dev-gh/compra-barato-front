import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ListService } from '../../services/list.service';
import { Router, RouterLink } from '@angular/router';
import { WhatsappService } from '../../services/whatsapp.service';
import { WhatsAppRequest } from '../../interfaces/whatsappRequest.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-list',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit {

  myList: Product[] = [];
  form: FormGroup;

  constructor(private listService: ListService, private waService: WhatsappService, private router: Router, private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
      ]],
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.minLength(9),
        Validators.maxLength(10)
      ]]
    })
  }

  ngOnInit(): void {
    this.getMyList();
  }

  getMyList() {
    this.myList = this.listService.getList();
  }

  deleteProduct(name: string) {
    const deletePRoduct = confirm(`Desea eliminar de la lista el producto: ${name}`)
    if(deletePRoduct){
      this.listService.deleteProduct(name);
      window.location.reload();
    }
  }

  sendMessage() {
    if (this.myList.length >= 5) {
      const request: WhatsAppRequest = {
        products: this.listService.getList(),
        username: this.form.get('name')?.value,
        phoneNumber: `+34${this.form.get('name')?.value}`
      }
      this.waService.sendListMessage(request).subscribe({
        next: send => {
          if (send) {
            this.listService.clear();
            alert("¡Mensaje enviado!");
            this.router.navigate(['/index']).then(()=>window.location.reload());
          }
        },
        error: e => {
          console.error("Error", e);
          alert("Error al enviar mensaje");
          this.router.navigate(['/index']);
        }
      });
    } else {
      alert("Debe tener al menos 5 productos agregados");
      window.location.reload();
    }
  }

  clearList(){
    const deleteAll = confirm("Eliminar todos los productos de mi lista");
    if(deleteAll){
      this.listService.clear();
      window.location.reload();
    }
  }

}
