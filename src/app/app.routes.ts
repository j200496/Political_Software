import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateComponent } from './components/update/update.component';
import { LoginComponent } from './components/login/login.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ChartsComponent } from './components/charts/charts.component';
import { ProvinciasComponent } from './components/provincias/provincias.component';

import { authGuard } from './guard/auth.guard';
import { AsigprovComponent } from './components/asigprov/asigprov.component';
import { AsigusuariosComponent } from './components/asigusuarios/asigusuarios.component';
import { MainComponent } from './components/main/main.component';
import { EquipoComponent } from './components/equipo/equipo.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  {
    path: 'layout',
    component: LayoutComponent,
    canActivate: [authGuard],  // ← protección con JWT
    children: [
      { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
      {path:'equipo',component:EquipoComponent,canActivate:[authGuard]},
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: 'update/:id', component: UpdateComponent, canActivate: [authGuard] },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard] },
      { path: 'provincias', component: ProvinciasComponent, canActivate: [authGuard] },
      { path:'asgprov',component: AsigprovComponent, canActivate: [authGuard]},
      {path:'asgusu',component:AsigusuariosComponent, canActivate: [authGuard]},

      {
        path: 'charts',
        loadComponent: () =>
          import('./components/charts/charts.component').then(
            (m) => m.ChartsComponent
          ),
        canActivate: [authGuard]
      }
    ]
  }
];
