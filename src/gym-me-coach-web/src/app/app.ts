import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly auth = inject(AuthService);
  protected readonly title = signal('Gym Me Coach');
  protected readonly sections = [
    { path: '/oggi', label: 'Oggi', icon: 'pi-home' },
    { path: '/piano', label: 'Piano', icon: 'pi-calendar' },
    { path: '/progressi', label: 'Progressi', icon: 'pi-chart-line' },
    { path: '/alimentazione', label: 'Alimentazione', icon: 'pi-apple' },
    { path: '/coach', label: 'Coach', icon: 'pi-comments' },
  ];
}
