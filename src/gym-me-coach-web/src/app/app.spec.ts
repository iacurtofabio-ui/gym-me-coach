import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

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

  it('should show the five sections in the menu', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const labels = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll('.menu-item'),
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
