import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItemsSource = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();

  private cartItems: any[] = [];

  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.cartItemsSource.next(this.cartItems);
  }

  updateCart(product: any) {
    const productIndex = this.cartItems.findIndex(item => item.id === product.id);
    if (productIndex > -1) {
      this.cartItems[productIndex] = product;
      this.cartItemsSource.next(this.cartItems);
    }
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.cartItemsSource.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSource.next(this.cartItems);
  }
}
