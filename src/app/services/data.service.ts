import { Injectable, EventEmitter } from '@angular/core';
import { Contenido, Serie, Episodio } from '../models/contenido.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  infoResultado$ = new EventEmitter<Contenido[]>();
  infoSerie$ = new EventEmitter<Serie>();
  infoEpisodios$ = new EventEmitter<Episodio[]>();

  constructor() { }

}