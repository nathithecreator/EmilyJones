import { Component, OnInit } from '@angular/core';
import { CartNumberService } from '../../../../Services/CartNumberService';
import { CartServiceService } from '../../../../Services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showCartDropdown = false; // to show Dropdown menu
  chartNumber: number = 0; // number displayed on navigation bar for cart
  cartItems: any[] = []; // Array to hold cart items
  productCounters: { [key: string]: number } = {}; // Track counters for each product
  subTotal: number = 0; // Total of the Cart

  constructor(private cartNumberService: CartNumberService, private cartService: CartServiceService) {}

  ngOnInit() {
    this.cartNumberService.currentChartNumber$.subscribe(count => {
      this.chartNumber = count;
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.chartNumber = items.length;
      this.calculateSubTotal();
      this.initializeProductCounters();
    });
  }

  toggleCartDropdown() {
    this.showCartDropdown = !this.showCartDropdown;
  }

  incrementCart(productId: number) {
    const product = this.cartItems.find(item => item.id === productId);
    if (product) {
      product.quantity++;
      this.cartService.updateCart(product);
    }
  }

  decrementCart(productId: number) {
    const product = this.cartItems.find(item => item.id === productId);
    if (product) {
      if (product.quantity > 1) {
        product.quantity--;
        this.cartService.updateCart(product);
      } else {
        this.removeFromCart(productId);
      }
      this.calculateSubTotal();
    }
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
  

  calculateSubTotal() {
    this.subTotal = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  initializeProductCounters() {
    this.cartItems.forEach(item => {
      if (this.productCounters[item.id] === undefined) {
        this.productCounters[item.id] = item.quantity || 1; // Initialize with existing quantity or default to 1
      }
    });
  }
}
