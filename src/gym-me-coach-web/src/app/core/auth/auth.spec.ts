import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';
import { authInterceptor } from './auth.interceptor';
import { AuthService } from './auth.service';

function futureExpiry() {
  return new Date(Date.now() + 3_600_000).toISOString();
}

function setup() {
  TestBed.configureTestingModule({
    providers: [
      provideRouter(routes),
      provideHttpClient(withInterceptors([authInterceptor])),
      provideHttpClientTesting(),
    ],
  });
  return {
    auth: TestBed.inject(AuthService),
    http: TestBed.inject(HttpClient),
    backend: TestBed.inject(HttpTestingController),
    router: TestBed.inject(Router),
  };
}

describe('Auth', () => {
  afterEach(() => localStorage.clear());

  it('starts logged out when no token is stored', () => {
    expect(setup().auth.isLoggedIn()).toBe(false);
  });

  it('stores the token after a successful login', () => {
    const { auth, backend } = setup();
    auth.login('a@example.com', 'secret').subscribe();
    backend
      .expectOne('/api/auth/login')
      .flush({ accessToken: 'abc', expiresAtUtc: futureExpiry() });

    expect(auth.isLoggedIn()).toBe(true);
    expect(localStorage.getItem('gmc.token')).toBe('abc');
  });

  it('discards a stored token that has expired', () => {
    localStorage.setItem('gmc.token', 'old');
    localStorage.setItem('gmc.token-expiry', new Date(Date.now() - 1000).toISOString());
    expect(setup().auth.isLoggedIn()).toBe(false);
  });

  it('adds the token to requests towards the api', () => {
    localStorage.setItem('gmc.token', 'abc');
    localStorage.setItem('gmc.token-expiry', futureExpiry());
    const { http, backend } = setup();

    http.get('/api/auth/me').subscribe();
    const request = backend.expectOne('/api/auth/me');
    expect(request.request.headers.get('Authorization')).toBe('Bearer abc');
    request.flush({});
  });

  it('logs out when the api answers 401 on a protected call', () => {
    localStorage.setItem('gmc.token', 'abc');
    localStorage.setItem('gmc.token-expiry', futureExpiry());
    const { auth, http, backend } = setup();

    http.get('/api/auth/me').subscribe({ error: () => undefined });
    backend.expectOne('/api/auth/me').flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(auth.isLoggedIn()).toBe(false);
  });

  it('keeps the session when a wrong password gets 401 on login', () => {
    localStorage.setItem('gmc.token', 'abc');
    localStorage.setItem('gmc.token-expiry', futureExpiry());
    const { auth, backend } = setup();

    auth.login('a@example.com', 'wrong').subscribe({ error: () => undefined });
    backend.expectOne('/api/auth/login').flush(null, { status: 401, statusText: 'Unauthorized' });

    expect(auth.isLoggedIn()).toBe(true);
  });

  it('sends a logged-out user to the login page', async () => {
    const { router } = setup();
    await router.navigateByUrl('/piano');
    expect(router.url).toBe('/accesso');
  });

  it('sends a logged-in user away from the login page', async () => {
    localStorage.setItem('gmc.token', 'abc');
    localStorage.setItem('gmc.token-expiry', futureExpiry());
    const { router } = setup();
    await router.navigateByUrl('/accesso');
    expect(router.url).toBe('/oggi');
  });
});
