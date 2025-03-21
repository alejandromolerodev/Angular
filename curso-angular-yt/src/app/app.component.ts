import { Component, inject, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TareasService } from './services/tareas.service';


@Component({
  selector: 'app-root',
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  listaTareas: string[] = [];
  nuevaTarea: string = '';

  private _tareasService = inject(TareasService);


  ngOnInit() {
    this.listaTareas = this._tareasService.getTareas();
  }

  agregarTarea() {
    this._tareasService.agregarTarea(this.nuevaTarea);
    this.nuevaTarea = '';
    this.listaTareas = this._tareasService.getTareas();
  }

  eliminarTarea(index: number) {
    this._tareasService.eliminarTarea(index);
    this.listaTareas = this._tareasService.getTareas();
  }
}
