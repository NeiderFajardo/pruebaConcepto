import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { VistaPrincipalHelper } from 'src/app/helpers/vista-principal.helper';
import { Subscription } from 'rxjs';
import { Episodio } from 'src/app/models/contenido.model';

@Component({
  selector: 'app-vista-detalle',
  templateUrl: './vista-detalle.component.html',
  styleUrls: ['./vista-detalle.component.css'],
})
export class VistaDetalleComponent implements OnInit, OnDestroy {
  @Input() contenido: number;

  serieSubscriptor: Subscription;
  imagenSerie: string;
  temporadas = [];
  episodioTemporada: Episodio[] = [];
  mostrarEpisodios: boolean = false;


  constructor(private dataService: DataService, private helper: VistaPrincipalHelper) { }
  ngOnDestroy(): void {
    this.serieSubscriptor.unsubscribe();
  }

  ngOnInit() {

    this.helper.getInfoSerie(this.contenido);
    this.cargarSerie();
  }

  async cargarSerie(){
    this.serieSubscriptor = this.dataService.infoSerie$.subscribe( data => {
      this.imagenSerie = data["Imagen"];
      this.temporadas = data["Temporadas"];
      this.cargarEpisodios().then( value => { this.mostrarEpisodios=true; });
    });

  }

  async cargarEpisodios(){
    for(let i=0;i<this.temporadas.length;i++){
      this.helper.getEspisodios(this.contenido, this.temporadas[i]["season_number"])
    }
    this.dataService.infoEpisodios$.subscribe( data => {
        this.episodioTemporada.push(data)
    });
  }



}
