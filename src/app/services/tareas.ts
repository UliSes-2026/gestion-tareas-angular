import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Tareas {
  private apiUrl = 'http://127.0.0.1:8000/api/tareas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  crear(tarea: any) {
    return this.http.post<any>(this.apiUrl, tarea);
  }

  actualizar(id: number, tarea: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, tarea);
  }

  eliminar(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}   