import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tareas as TareasService } from '../services/tareas';

@Component({
  selector: 'app-tareas',
  imports: [FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class Tareas implements OnInit {
  title = 'Gestión de tareas';

  mensaje = '';

  nuevaTarea = {
    nombre: '',
    tarea: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_limite: ''
  };

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

  agregarTarea() {
    if (
      this.nuevaTarea.nombre.trim() === '' ||
      this.nuevaTarea.tarea.trim() === '' ||
      this.nuevaTarea.fecha_inicio === '' ||
      this.nuevaTarea.fecha_limite === ''
    ) {
      return;
    }

    const nueva = {
      ...this.nuevaTarea,
      completada: false
    };

    this.tareasService.crear(nueva).subscribe({
      next: (respuesta) => {
        this.tareas.update((tareas) => [respuesta, ...tareas]);
        this.mensaje = 'Tarea creada correctamente';

        this.nuevaTarea = {
          nombre: '',
          tarea: '',
          descripcion: '',
          fecha_inicio: '',
          fecha_limite: ''
        };
      },
      error: (error) => {
        console.log('Error al crear tarea', error);
        this.mensaje = 'Error al crear tarea';
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