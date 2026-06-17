import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Tareas } from './tareas/tareas';

export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'tareas',
    component: Tareas
  }
];