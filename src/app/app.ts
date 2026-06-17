import { Component } from '@angular/core';
import { Tareas as TareasComponent } from './tareas/tareas';

@Component({
  selector: 'app-root',
  imports: [TareasComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}