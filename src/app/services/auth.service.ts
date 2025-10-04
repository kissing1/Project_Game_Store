import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(this.hasLogin());
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor() {}

  private hasLogin(): boolean {
    return !!localStorage.getItem('userId');
  }

  login() {
    this._isLoggedIn.next(true);
  }

  logout() {
    this._isLoggedIn.next(false);
    localStorage.clear();
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}
