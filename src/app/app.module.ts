import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VistaDetalleComponent } from './components/vista-detalle/vista-detalle.component';
import { VistaPrincipalComponent } from './components/vista-principal/vista-principal.component';
import { VistaEpisodiosComponent } from './components/vista-episodios/vista-episodios.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaDetalleComponent,
    VistaPrincipalComponent,
    VistaEpisodiosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    InfiniteScrollModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
