import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Tareas } from './tareas/tareas';
import { CrearTarea } from './tareas/crear-tarea/crear-tarea';

export const routes: Routes = [
  {
    path: '',
    component: Inicio
  },
  {
    path: 'tareas',
    component: Tareas
  },
  {
    path: 'tareas/crear',
    component: CrearTarea
  }
];
