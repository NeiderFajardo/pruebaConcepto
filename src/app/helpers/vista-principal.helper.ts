import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contenido, Serie, Episodio } from './../models/contenido.model';
import { DataService } from './../services/data.service';

@Injectable({
    providedIn: 'root',
})
export class VistaPrincipalHelper {

    key: string = 'b2907782d07859a652052d3bae537475';
    resultados: Contenido[] = [];
    serie: Serie[] = [];
    listaEpisodios: Episodio[] = [];
    


    constructor(private http: HttpClient, private dataService: DataService) {
    }

    public getMultiInforacion(busqueda: string) {
        var request = 'https://api.themoviedb.org/3/search/multi?api_key=' + this.key + '&language=es-CO&query=' + busqueda + '&page=1&include_adult=false';
        this.resultados = [];
        console.log(busqueda)
        this.http.get(request).toPromise().then(data => {
            for (let key in data) {
                var cont = Object.keys(data[key]).map(function (tipodato) {
                    let contenido = data[key][tipodato];
                    return contenido;
                });
                var titulo: string;
                var rutaImg: string;
                for (let o in cont) {
                    if (o !== null) {
                        if (cont[o]["media_type"] === "movie" || cont[o]["media_type"] === "tv") {
                            if (cont[o]["name"] === undefined) {
                                titulo = cont[o]["title"];
                            } else {
                                titulo = cont[o]["name"];
                            }
                            rutaImg = "https://image.tmdb.org/t/p/original"+cont[o]["poster_path"];
                            let contenido: Contenido = {
                                Nombre: titulo,
                                Imagen: rutaImg,
                                Rating: cont[o]["vote_average"],
                                Tipo: cont[o]["media_type"],
                                Id: cont[o]["id"]
                            };
                            this.resultados.push(contenido);
                        }
                    }
                }

            }
            this.dataService.infoResultado$.emit(this.resultados)
        });

    }


    public getInfoSerie(id: number){
        console.log(id)
        var image: string;
        var nombre: string;
        var rating: string;
        var temps: number;
        var temporadas: [];
        var request = 'https://api.themoviedb.org/3/tv/'+id+'?api_key='+this.key+'&language=es-CO';
        this.resultados = [];
        this.http.get(request).toPromise().then( data => {
            for(let key in data){
                if(key ==="poster_path"){
                    image = "https://image.tmdb.org/t/p/original"+data[key];
                } else if (key === "name"){
                    nombre = data[key];
                } else if( key === "vote_average"){
                    rating = data[key];
                } else if(key === "number_of_seasons"){
                    temps = data[key];
                }else if(key === "seasons"){
                    temporadas = data[key];
                }
            }
            let serie: Serie = {
                Nombre: nombre,
                Imagen: image,
                Id: id,
                Rating: rating,
                NumTemporadas: temps,
                Temporadas: temporadas
            }
            this.dataService.infoSerie$.emit(serie);
        });
    }

    public getEspisodios(tvid: number, numberSeason: number){
        this.listaEpisodios = [];
        var resultadoEpisodios = [];
        var request = 'https://api.themoviedb.org/3/tv/'+tvid+'/season/'+numberSeason+'?api_key='+this.key+'&language=es-CO';
        this.http.get(request).toPromise().then( data => {
            for(let key in data){
                if(key === "episodes"){
                    this.listaEpisodios = data[key];
                }
            }
            for(let obj in this.listaEpisodios){
                let episodio: Episodio = {
                    Nombre: this.listaEpisodios[obj]["name"],
                    Numero: this.listaEpisodios[obj]["episode_number"]
                }
                
                resultadoEpisodios.push(episodio);
            }
            this.dataService.infoEpisodios$.emit(resultadoEpisodios);
        });

    }
}   