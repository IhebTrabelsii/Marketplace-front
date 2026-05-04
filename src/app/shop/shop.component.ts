import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  searchtext:any;
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  showForm = false;
  products: { name: string; price: number; image: string }[] = [
    { name: 'AIRBLADE 500 RGB', price: 40, image: '1.jpg' },
    { name: 'Refroidisseur X game', price: 450, image: '7.png' },
    { name: 'ECLIPSE S444', price: 50, image: '8.png' },
    { name: 'BG AIRGARDE RGB', price: 52, image: '9.png' },
    { name: 'AIRBLADE 420 RGB', price: 60, image: '10.jpg' },
    { name: 'FREEZATOR RBG16', price: 90, image: '11.jpg' },
    { name: 'AIRBLADE 200 RGB', price: 99, image: '12.jpg' },
    { name: 'GAMMA 200D6', price: 110, image: '13.jpg' },
    { name: 'TROVIN 16 GENERATOR', price: 160, image: '14.jpg' },
    { name: 'AQIRYS WEBB Moyen', price: 15, image: '15.jpg' },
    { name: 'AZERQZ WEB MOYEN', price: 20, image: '16.jpg' },
    { name: 'REDRAGON ARCHELON X', price: 25.5, image: '17.jpg' },
    { name: 'REDRAGON ARCHELON L', price: 30, image: '18.jpg' },
    { name: 'AZERTY WEBB Moyen', price: 35, image: '19.jpg' },
    { name: 'AQIRYS ECLIPSE Moyen RVB', price: 60, image: '5.jpg' },
    { name: 'ARCHELON L', price: 69, image: '20.jpg' },
    { name: 'QWERTY WEBB Moyen', price: 70, image: '21.jpg' },
    { name: 'AQIRYS ARCHELON L', price: 99, image: '22.jpg' },
    { name: 'UNITECK MOYEN BAG', price: 20, image: '23.jpg' },
    { name: 'BAG PC', price: 40, image: '24.jpg' },
    { name: 'UNITECK X BAG', price: 42, image: '25.jpg' },
    { name: 'UNITECK DEMENTION BAG', price: 45, image: '26.jpg' },
    { name: 'UNITECK YORU BAG', price: 59, image: '27.jpg' },
    { name: 'UNITECK STREMER', price: 66, image: '28.jpg' },
    { name: 'UNITECK ARCHELON ', price: 69, image: '6.jpg' },
    { name: 'SOVA BAG GAMING', price: 70, image: '29.jpg' },
    { name: 'UNITECK LARGE BAG', price: 77, image: '30.jpg' },
    { name: 'AQIRYS SIRIUS', price: 60, image: '3.jpg' },
    { name: 'AQIRYS VEGA RGB', price: 70, image: '31.jpg' },
    { name: 'FANTECH HG17', price: 89, image: '32.jpg' },
    { name: 'FANTECH HG15', price: 110, image: '33.jpg' },  
    { name: 'AQIRYS ALTAIR RGB', price: 150, image: '34.jpg' },
    { name: ' AQIRYS ALTAIR RGB', price: 210, image: '35.jpg' },
    { name: 'AQIRYS ANDROMEDA Double mode', price: 290, image: '36.jpg' },
    { name: 'AQIRYS ALYA Stéréo 3D', price: 299, image: '37.jpg' },
    { name: 'MAXLIFE', price: 310, image: '38.jpg' },  
    { name: ' MEETION A1', price: 42, image: '2.jpg' },
    { name: ' ADVANCE S-3D', price: 50, image: '39.jpg' },
    { name: ' NITROX GT-300+', price: 99, image: '40.jpg' },
    { name: 'SPIDER X3', price: 100, image: '41.jpg' },
    { name: 'S-BOX M-958B', price: 120, image: '42.jpg' },
    { name: 'AQIRYS POLARIS', price: 129, image: '43.jpg' },
    { name: ' JERTECH M200', price: 144, image: '44.jpg' },  
    { name: 'XTRFY M1 RGB', price: 150, image: '45.jpg' },
    { name: 'Compact 300', price: 230, image: '46.jpg' },
    { name: 'AQIRYS CAPELLA', price: 90, image: '48.jpg' },
    { name: 'AQIRYS MIRA 100%', price: 112, image: '49.jpg' },
    { name: 'ALUDRA TKL', price: 130, image: '50.jpg' },  
    { name: 'Simple MACRO USB', price: 150, image: '51.jpg' },
    { name: 'Mini Smart', price: 166, image: '52.jpg' },
    { name: 'DELL KB216 USB', price: 190, image: '53.jpg' },
    { name: 'MATEPAD 11', price: 209, image: '4.jpg' },
    { name: 'VATA K580', price: 290, image: '55.jpg' },
    { name: 'HAVIT KB2006 Multimédia', price: 539, image: '54.jpg' },

  ];
  searchText : string= '';
  filteredProducts: any[];

  constructor() {
    this.filteredProducts = this.products;
  }
  filterProducts() {
    if (!this.searchText.trim()) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }
  shoppingCart: { name: string; price: number }[] = [];

  addToCart(product: { name: string; price: number }) {
    this.shoppingCart.push({ name: product.name, price: product.price });
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const button = document.getElementById('scrollToTopBtn');
    if (button) {
      button.style.display = (window.pageYOffset > 100) ? 'block' : 'none';
    }
  }
}


