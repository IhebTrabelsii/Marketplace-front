import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  products: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('http://localhost:3000/api/products-user').subscribe(
      (products: any[]) => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
  deleteProduct(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      this.http.delete(`http://localhost:3000/api/product_delete/${id}`).subscribe({
        next: () => {
          this.fetchProducts(); 
          console.log('Product deleted successfully.');
          alert('Product deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting product:', error);
          alert('Error deleting product. Please try again.');
        }
      });
    }
  }
  


  toggleEditMode(product: any) {
    product.editMode = !product.editMode;
  }

  updateProduct(updatedProduct: any) {
    // Update the product using the API
    this.http.put(`http://localhost:3000/api/products/${updatedProduct.id}`, updatedProduct).subscribe(
      () => {
        console.log('Product updated successfully');
        this.fetchProducts(); // Fetch updated product list after update
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }

  moveToAdminProduct() {
    for (const product of this.products) {
      const productAdminData = {
        name: product.name,
        price: product.price,
        address: product.address,
        number: product.number,
        email: product.email
      };
  
      this.http.post('http://localhost:3000/api/products-admin1', productAdminData).subscribe(
        () => {
          console.log('Product added to product-admin successfully');
          console.log(productAdminData);
        },
        error => {
          console.error('Error adding product to product-admin:', error);
        }
      );
      
    }
  }


}
