import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {  
  private apiUrl = 'http://127.0.0.1:8000/api/tareas';

  constructor(private http: HttpClient) {}

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

  ngOnInit() {
    this.cargarTareas();
  }

  cargarTareas() {
    this.http.get<any[]>(this.apiUrl).subscribe({
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

  this.http.put<any>(`${this.apiUrl}/${id}`, tareaActualizada).subscribe({
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
  this.http.delete(`${this.apiUrl}/${id}`).subscribe({
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

    this.http.post<any>(this.apiUrl, nueva).subscribe({
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
}
