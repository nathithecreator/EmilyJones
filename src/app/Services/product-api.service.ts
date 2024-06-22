import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductPost } from '../Models/Product-post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductAPIService {

  constructor(private http: HttpClient) { }

  getAllProductPosts(): Observable<ProductPost[]> {
    return this.http.get<ProductPost[]>('https://localhost:7205/api/product');
  }
  
}
