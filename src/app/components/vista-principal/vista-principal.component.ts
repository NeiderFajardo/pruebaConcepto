import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Contenido } from './../../models/contenido.model';
import { VistaPrincipalHelper } from './../../helpers/vista-principal.helper';
import { DataService } from './../../services/data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-vista-principal',
  templateUrl: './vista-principal.component.html',
  styleUrls: ['./vista-principal.component.css'],
})
export class VistaPrincipalComponent implements OnInit {

  menuPosition: any;
  sticky: boolean = false;
  resultSubscription: Subscription;
  resultados: Contenido[] = [];
  result: any;
  abuscar = "";
  noResult: boolean;
  alerta: string;
  tituloContenido: string;
  idSerie: number;

  constructor(
    private vistaPrincipalHelper: VistaPrincipalHelper,
    private dataService: DataService,
    private cdr: ChangeDetectorRef,
    public modal: NgbModal
  ) {
    this.noResult = true;
    this.alerta = "No hay contenido para mostrar..."
  }

  ngOnInit() {


    this.cargarDatos();

  }

  onScroll() {
    console.log("scrolled")
  }


  async cargarDatos() {
    this.resultSubscription = this.dataService.infoResultado$.subscribe(resultado => {
      this.resultados = [];
      if(resultado.length === 0){
        this.alerta = "No hay resultado para la búsqueda"
        this.noResult = true;
      } else {
        for (let obj in resultado) {
          this.resultados.push(resultado[obj])
  
        }
      }
      
      this.cdr.detectChanges();

    });
  }

  irContenido(contenido: any, idS: number, tipo: string, nombre: string) {
    if (tipo === "tv") {
      this.tituloContenido = nombre;
      this.idSerie = idS;
      this.modal.open(contenido, { size: 'xl' });
    } else {
      console.log("Contenido no disponible")
    }

  }

  aBuscar(event: any) {
    this.abuscar = event.target.value;
    if (this.abuscar !== "") {
      this.vistaPrincipalHelper.getMultiInforacion(this.abuscar);
      this.noResult = false;
    } else {
      this.resultados = [];
      this.noResult = true;
    }
    this.abuscar = "";

  }

  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

}
