import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const isAdminRoute = route.routeConfig.path === 'add' || route.routeConfig.path.includes('edit');
    if (isAdminRoute && !this.authService.isAdmin()) {
      console.log('Accès refusé : vous devez être admin pour accéder à cette page.');
      this.router.navigate(['/home']);
      return false;
    }

    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      console.log('Accès refusé : vous devez être connecté.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}