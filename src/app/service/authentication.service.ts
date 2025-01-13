import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkLoginStatus());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor() { }

  private checkLoginStatus(): boolean {
    const loggedIn = localStorage.getItem('isLoggedIn');
    return loggedIn === 'true';  
  }

  login(): boolean {
    localStorage.setItem('isLoggedIn', 'true');
    this.isLoggedInSubject.next(true);
    return true; 
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedInSubject.next(false);
  }
}
