import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
})
export class ProductFormComponent {

  
  @Input() product: any;
  @Input() showForm: boolean | undefined; 
  @Output() addProduct = new EventEmitter<any>(); 

  products: any = {};

  

  constructor(private http: HttpClient,private fb:FormBuilder) { }
   cartData= this.fb.group ({
    name: this.products.name,
    Email: this.products.Email,
    address: this.products.address, 
    price: this.products.price,
    number: this.products.number,

  });
  onSubmit() {
    this.addProduct.emit(this.products);
    this.products = {}; 
  }

  addToCart() {


    this.http.post('http://localhost:3000/api/add-to-cart', this.cartData.value).subscribe(
      () => {
        console.log('Product added to cart successfully');
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
