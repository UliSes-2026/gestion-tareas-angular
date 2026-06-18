import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Tareas as TareasService } from '../../services/tareas';

@Component({
  selector: 'app-crear-tarea',
  imports: [FormsModule, RouterLink],
  templateUrl: './crear-tarea.html',
  styleUrl: './crear-tarea.css'
})
export class CrearTarea {
  mensaje = '';

  nuevaTarea = {
    nombre: '',
    tarea: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_limite: ''
  };

  constructor(
    private tareasService: TareasService,
    private router: Router
  ) {}

  agregarTarea() {
    if (
      this.nuevaTarea.nombre.trim() === '' ||
      this.nuevaTarea.tarea.trim() === '' ||
      this.nuevaTarea.fecha_inicio === '' ||
      this.nuevaTarea.fecha_limite === ''
    ) {
      this.mensaje = 'Completa los campos obligatorios';
      return;
    }

    const nueva = {
      ...this.nuevaTarea,
      completada: false
    };

    this.tareasService.crear(nueva).subscribe({
      next: () => {
        this.router.navigate(['/tareas']);
      },
      error: (error) => {
        console.log('Error al crear tarea', error);
        this.mensaje = 'Error al crear tarea';
      }
    });
  }
}