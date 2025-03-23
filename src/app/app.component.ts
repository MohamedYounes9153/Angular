import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AssignmentsService } from './shared/assignments.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titre = 'Premier projet Angular';
  isSidenavOpened = false;
  constructor(
    private assignmentsService: AssignmentsService,
    public authService: AuthService // Injection du service d'authentification
  ) {}

  genererDonneesDeTest() {
    if (this.authService.isAdmin()) {
      console.log("Génération des données de test");
      this.assignmentsService.peuplerBDavecForkJoin()
        .subscribe(() => {
          console.log("Toutes les données de test ont été insérées");
          window.location.href = '/home';
        });
    } else {
      console.log("Accès refusé : vous devez être admin pour générer des données de test.");
    }
  }
  logout(): void {
    this.authService.logout();
    console.log('Déconnexion réussie');
    window.location.href = '/login'; // Redirige vers la page de connexion
  }

  toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}