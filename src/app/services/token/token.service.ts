import { Injectable } from '@angular/core';

export interface AuthUser {
  id: string
  email: string
  first_name: string
  last_name: string
  is_staff: boolean
  username: string
  groups: string[]
}

export interface AuthGroup {
  id: string
  name: string
}

const TOKEN_KEY = '__mara-auth-token____';
const REFRESH_TOKEN_KEY = '__mara-refresh-token____';
const TOKEN_EXPIRY_TIME_KTOKEN_EXPIRY_TIME_KEYEY = '__mara-auth-expiry____';
const USER_KEY = '__mara-auth-user____';
const USER_GATE_KEY = '__mara-auth-user-gate____';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN_KEY)
  }

  public getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY)
  }


  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public saveRefreshToken(token: string): void {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public saveUserInfo(user: AuthUser): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));

  }


  public unsetUserGate() {
    window.localStorage.removeItem(USER_GATE_KEY)
  }

  public getUser(): AuthUser | null {
    var userObjStr = window.localStorage.getItem(USER_KEY)
    return userObjStr ? JSON.parse(userObjStr) : null
  }

  logout(): void {
    window.localStorage.clear();
  }
}
