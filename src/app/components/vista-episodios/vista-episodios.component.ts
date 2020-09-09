import { Component, OnInit, Input } from '@angular/core';
import { Episodio, Serie } from 'src/app/models/contenido.model';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-vista-episodios',
  templateUrl: './vista-episodios.component.html',
  styleUrls: ['./vista-episodios.component.css']
})
export class VistaEpisodiosComponent implements OnInit {
  @Input() temporada: number;
  @Input() episodios: Episodio[] = [];

  listaCapitulos: Episodio[]= [];
  episodioSupcriptor: Subscription;

  
  constructor( private dataService: DataService) { }

  ngOnInit() {

    this.episodios;
    

    this.cargarEpisodios(this.episodios ,this.temporada);
  }

  async cargarEpisodios(capitulos ,pos: number){
  
    const delay = ms => new Promise(res => setTimeout(res, ms));

    await delay(3000)
    
    this.listaCapitulos = capitulos[pos];
    console.log(this.listaCapitulos)
    
  }

  
}

