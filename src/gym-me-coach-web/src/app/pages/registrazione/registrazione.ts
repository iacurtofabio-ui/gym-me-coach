import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../core/auth/auth.service';

const MIN_PASSWORD_LENGTH = 10;

@Component({
  selector: 'app-registrazione',
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, MessageModule],
  template: `
    <section class="auth-page">
      <h1>Gym Me Coach</h1>
      <h2>Crea il tuo account</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label for="email">Email</label>
        <input pInputText id="email" type="email" autocomplete="email" formControlName="email" />
        @if (showError(form.controls.email)) {
          <small class="field-error">
            {{ form.controls.email.hasError('required') ? 'Inserisci la tua email.' : "L'email non è valida: controlla che ci sia la @ (esempio: nome@dominio.it)." }}
          </small>
        }

        <label for="password">Password (almeno {{ minPasswordLength }} caratteri)</label>
        <input
          pInputText
          id="password"
          type="password"
          autocomplete="new-password"
          formControlName="password"
        />
        @if (showError(form.controls.password)) {
          <small class="field-error">
            {{ form.controls.password.hasError('required') ? 'Inserisci una password.' : 'La password è troppo corta: servono almeno ' + minPasswordLength + ' caratteri.' }}
          </small>
        }

        <label for="birthDate">Data di nascita</label>
        <input pInputText id="birthDate" type="date" formControlName="birthDate" />
        @if (showError(form.controls.birthDate)) {
          <small class="field-error">Inserisci la tua data di nascita.</small>
        }
        <small>L'app è riservata a chi ha almeno 18 anni.</small>

        @for (message of errors(); track message) {
          <p-message severity="error">{{ message }}</p-message>
        }

        <p-button type="submit" label="Registrati" [loading]="busy()" />
      </form>
      <p>Hai già un account? <a routerLink="/accesso">Accedi</a></p>
    </section>
  `,
})
export class Registrazione {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly minPasswordLength = MIN_PASSWORD_LENGTH;
  protected readonly busy = signal(false);
  protected readonly errors = signal<string[]>([]);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]],
    birthDate: ['', Validators.required],
  });

  protected showError(control: AbstractControl) {
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password, birthDate } = this.form.getRawValue();
    this.busy.set(true);
    this.errors.set([]);
    // After registering, log in with the same credentials so the user lands inside the app.
    this.auth.register({ email, password, birthDate }).subscribe({
      next: () =>
        this.auth.login(email, password).subscribe({
          next: () => void this.router.navigate(['/oggi']),
          error: () => void this.router.navigate(['/accesso']),
        }),
      error: (error: unknown) => {
        this.busy.set(false);
        this.errors.set(this.readMessages(error));
      },
    });
  }

  // The API answers with a ProblemDetails: { errors: { field: [messages] } }.
  private readMessages(error: unknown): string[] {
    const fields = error instanceof HttpErrorResponse ? error.error?.errors : null;
    const messages = fields ? Object.values<string[]>(fields).flat() : [];
    return messages.length > 0 ? messages : ['Registrazione non riuscita. Riprova più tardi.'];
  }
}
