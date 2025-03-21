import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];

  private isAuthenticated = false;

  login(username: string, password: string): boolean {
    console.log('Validation des informations de connexion...');
    const user = this.validUsers.find(u => u.username === username && u.password === password);
    this.isAuthenticated = !!user;
    if (this.isAuthenticated) {
      console.log('Connexion réussie pour', username);
    } else {
      console.log('Échec de la connexion pour', username);
    }
    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}