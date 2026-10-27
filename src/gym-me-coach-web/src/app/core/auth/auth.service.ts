import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export interface TokenResponse {
  accessToken: string;
  expiresAtUtc: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  birthDate: string;
}

const TOKEN_KEY = 'gmc.token';
const EXPIRY_KEY = 'gmc.token-expiry';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly tokenState = signal(this.readStoredToken());

  readonly token = this.tokenState.asReadonly();
  readonly isLoggedIn = computed(() => this.tokenState() !== null);

  login(email: string, password: string) {
    return this.http
      .post<TokenResponse>('/api/auth/login', { email, password })
      .pipe(tap((response) => this.storeToken(response)));
  }

  register(request: RegisterRequest) {
    return this.http.post<void>('/api/auth/register', request);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    this.tokenState.set(null);
    void this.router.navigate(['/accesso']);
  }

  private storeToken(response: TokenResponse) {
    localStorage.setItem(TOKEN_KEY, response.accessToken);
    localStorage.setItem(EXPIRY_KEY, response.expiresAtUtc);
    this.tokenState.set(response.accessToken);
  }

  // A token past its expiry is discarded at startup, so the user lands on the login page.
  private readStoredToken(): string | null {
    const token = localStorage.getItem(TOKEN_KEY);
    const expiry = localStorage.getItem(EXPIRY_KEY);
    if (!token || !expiry) return null;
    return new Date(expiry).getTime() > Date.now() ? token : null;
  }
}
