import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule, // Pour utiliser [(ngModel)]
    MatFormFieldModule, // Pour <mat-form-field>
    MatInputModule, // Pour <input matInput>
    MatButtonModule // Pour <button mat-raised-button>
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    console.log('Tentative de connexion avec', this.username, this.password);
    if (this.authService.login(this.username, this.password)) {
      console.log('Connexion réussie, redirection vers /home');
      this.router.navigate(['/home']); // Redirige vers la page d'accueil
    } else {
      console.log('Échec de la connexion');
      alert('Nom d\'utilisateur ou mot de passe incorrect');
    }
  }
}