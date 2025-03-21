import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { NavigationErrorComponent } from './navigation-error-component/navigation-error-component.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
    // Route pour la page de login
    { path: 'login', component: LoginComponent },

    // Routes protégées par le guard
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection par défaut vers /login
    { path: 'home', component: AssignmentsComponent, canActivate: [AuthGuard] },
    { path: 'add', component: AddAssignmentComponent, canActivate: [AuthGuard] },
    { path: 'assignments/:id', component: AssignmentDetailComponent, canActivate: [AuthGuard] },
    { path: 'assignments/:id/edit', component: EditAssignmentComponent, canActivate: [AuthGuard] },

    // Route pour les erreurs 404
    { path: '**', component: NavigationErrorComponent }
];