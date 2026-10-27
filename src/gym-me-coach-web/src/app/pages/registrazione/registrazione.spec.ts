import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Registrazione } from './registrazione';

describe('Registrazione', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }),
  );

  it('explains what is wrong instead of blocking the button', async () => {
    const fixture = TestBed.createComponent(Registrazione);
    const page = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();

    const form = fixture.componentInstance['form'];
    form.patchValue({ email: 'non-una-email', password: 'corta' });
    page.querySelector('form')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    const messages = Array.from(page.querySelectorAll('.field-error')).map((e) => e.textContent);
    expect(messages.join(' ')).toContain('non è valida');
    expect(messages.join(' ')).toContain('troppo corta');
    expect(messages.join(' ')).toContain('data di nascita');
    expect(page.querySelector('button[type=submit]')?.hasAttribute('disabled')).toBe(false);
  });
});
