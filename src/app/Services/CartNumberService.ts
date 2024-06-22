import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartNumberService {
  private cartNumberSubject = new BehaviorSubject<number>(0);

  currentChartNumber$ = this.cartNumberSubject.asObservable();

  setChartNumber(newNumber: number) {
    this.cartNumberSubject.next(newNumber);
  }
}