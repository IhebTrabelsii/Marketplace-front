import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductAdmin } from '../Models/ProductAdmin';
@Component({
  selector: 'app-adminproduct',
  templateUrl: './adminproduct.component.html',
  styleUrls: ['./adminproduct.component.css'],
})
export class AdminproductComponent implements OnInit {
  productAadmin: ProductAdmin[] | any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.moveToAdmin();
  }
  moveToAdmin() {
    this.http.get<any>('http://localhost:3000/api/products-admin').subscribe({
      next: (data) => {
        this.productAadmin = data; // Assuming this.productAdmin is the correct variable name
        console.log(this.productAadmin);
      },
      error: (error) => {
        console.log('Error fetching data:', error);
      },
    });
  }

  updateuser(productId: string) {
    const product = this.productAadmin.find((p: any) => p.id === productId);
    if (product) {
      const updatedProduct = {
        name: product.name,
        email: product.email,
        address: product.address,
        number: product.number,
        price: product.price,
      };

      this.http
        .put(
          `http://localhost:3000/api/product-update/${productId}`,
          updatedProduct
        )
        .subscribe({
          next: () => {
            console.log('Product updated successfully.');
            this.moveToAdmin();
          },
          error: (error) => {
            console.log('Error updating product:', error);
          },
        });
    }
  }

  toggleEditMode(product: any) {
    product.editMode = !product.editMode;
  }

  toggledropMode(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.http.delete(`http://localhost:3000/api/products/${id}`).subscribe({
        next: () => {
          // Remove the deleted product from the array
          this.moveToAdmin();
          console.log('Product deleted successfully.');
        },
        error: (error) => {
          console.log('Error deleting product:', error);
        },
      });
    }
  }
}
