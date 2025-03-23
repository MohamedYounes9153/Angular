import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUsers = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user1', password: 'password1', role: 'user' },
    { username: 'user2', password: 'password2', role: 'user' }
  ];

  private isAuthenticated = false;
  private currentUserRole: string | null = null;

  constructor() {
    // Récupère l'état d'authentification depuis localStorage
    const savedAuthState = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('currentUserRole');
    this.isAuthenticated = savedAuthState === 'true';
    this.currentUserRole = savedRole;
  }

  login(username: string, password: string): boolean {
    const user = this.validUsers.find(u => u.username === username && u.password === password);
    this.isAuthenticated = !!user;
    this.currentUserRole = user ? user.role : null;

    // Sauvegarde l'état d'authentification dans localStorage
    localStorage.setItem('isAuthenticated', String(this.isAuthenticated));
    localStorage.setItem('currentUserRole', this.currentUserRole || '');

    return this.isAuthenticated;
  }

  logout(): void {
    this.isAuthenticated = false;
    this.currentUserRole = null;

    // Supprime l'état d'authentification de localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUserRole');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  isAdmin(): boolean {
    return this.currentUserRole === 'admin';
  }
}