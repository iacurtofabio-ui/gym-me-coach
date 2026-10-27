import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { AuthService } from './core/auth/auth.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.setItem('gmc.token', 'test-token');
    localStorage.setItem('gmc.token-expiry', new Date(Date.now() + 3_600_000).toISOString());
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  afterEach(() => localStorage.clear());

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Gym Me Coach');
  });

  it('should hide the menu when nobody is logged in', async () => {
    TestBed.inject(AuthService).logout();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('.menu')).toBeNull();
  });

  it('should show the five sections in the menu', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const labels = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.menu-item:not(.logout)'),
    ).map((link) => link.textContent?.trim());
    expect(labels).toEqual(['Oggi', 'Piano', 'Progressi', 'Alimentazione', 'Coach']);
  });

  it('should open each section from its url', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    const compiled = fixture.nativeElement as HTMLElement;

    for (const [path, title] of [
      ['/oggi', 'Oggi'],
      ['/piano', 'Piano'],
      ['/progressi', 'Progressi'],
      ['/alimentazione', 'Alimentazione'],
      ['/coach', 'Coach'],
    ]) {
      await router.navigateByUrl(path);
      await fixture.whenStable();
      expect(compiled.querySelector('h2')?.textContent).toBe(title);
    }
  });
});
