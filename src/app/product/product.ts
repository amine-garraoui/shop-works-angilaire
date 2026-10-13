import { Component, signal } from '@angular/core';
import { Products } from '../models/products';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  color = signal('red')
  searchProduct = signal('')
  titleProduct: string = 'Ceci est le composant product';
  products = signal<Products[]>([
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      quantity: 10,
      likes: 0
    },
    {
      id: 2,
      name: 'Product 2',
      price: 150,
      quantity: 5,
      likes: 0
    },
  ]);

  save(){
    alert("Hello !")
  }

  buy(id: number){
    this.products.update(list => list.map(p => p.id === id && p.quantity > 0 ? {...p , quantity:p.quantity -1} : p))
  }

  like(id: number){
    this.products.update(list => list.map(p => p.id === id ? {...p , likes:p.likes +1} : p))
  }

  searchByName(){
    return this.products().filter(p => p.name.toLowerCase().includes(this.searchProduct().toLowerCase()))
  }

  


}
