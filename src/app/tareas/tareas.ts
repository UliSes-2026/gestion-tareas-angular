import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Tareas as TareasService } from '../services/tareas';

@Component({
  selector: 'app-tareas',
  imports: [RouterLink, DatePipe],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit {
  title = 'Gestión de tareas';

  tareas = signal<any[]>([]);

  constructor(private tareasService: TareasService) {}

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.tareasService.listar().subscribe({
      next: (respuesta) => {
        this.tareas.set(respuesta);
      },
      error: (error) => {
        console.log('Error al cargar tareas', error);
      }
    });
  }

  cambiarEstado(id: number) {
    const tarea = this.tareas().find((tarea) => tarea.id === id);

    if (!tarea) {
      return;
    }

    const tareaActualizada = {
      ...tarea,
      completada: !tarea.completada
    };

    this.tareasService.actualizar(id, tareaActualizada).subscribe({
      next: (respuesta) => {
        this.tareas.update((tareas) =>
          tareas.map((tarea) =>
            tarea.id === id ? respuesta : tarea
          )
        );
      },
      error: (error) => {
        console.log('Error al actualizar tarea', error);
      }
    });
  }

  eliminarTarea(id: number) {
    this.tareasService.eliminar(id).subscribe({
      next: () => {
        this.tareas.update((tareas) =>
          tareas.filter((tarea) => tarea.id !== id)
        );
      },
      error: (error) => {
        console.log('Error al eliminar tarea', error);
      }
    });
  }
}
