import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-accesso',
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, InputTextModule, MessageModule],
  template: `
    <section class="auth-page">
      <h1>Gym Me Coach</h1>
      <h2>Accedi</h2>
      <form [formGroup]="form" (ngSubmit)="submit()">
        <label for="email">Email</label>
        <input pInputText id="email" type="email" autocomplete="email" formControlName="email" />
        @if (showError(form.controls.email)) {
          <small class="field-error">
            {{ form.controls.email.hasError('required') ? 'Inserisci la tua email.' : "L'email non è valida: controlla che ci sia la @ (esempio: nome@dominio.it)." }}
          </small>
        }

        <label for="password">Password</label>
        <input
          pInputText
          id="password"
          type="password"
          autocomplete="current-password"
          formControlName="password"
        />
        @if (showError(form.controls.password)) {
          <small class="field-error">Inserisci la tua password.</small>
        }

        @if (error()) {
          <p-message severity="error">{{ error() }}</p-message>
        }

        <p-button type="submit" label="Accedi" [loading]="busy()" />
      </form>
      <p>Non hai un account? <a routerLink="/registrazione">Registrati</a></p>
    </section>
  `,
})
export class Accesso {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly busy = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly form = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  protected showError(control: AbstractControl) {
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.busy.set(true);
    this.error.set(null);
    this.auth.login(email, password).subscribe({
      next: () => void this.router.navigate(['/oggi']),
      error: () => {
        this.busy.set(false);
        this.error.set('Email o password non corrette, oppure account bloccato per qualche minuto.');
      },
    });
  }
}
