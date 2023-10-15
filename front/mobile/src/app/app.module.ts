import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PesquisadorComponent } from './components/pesquisador/pesquisador.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { PesquisadorModalAddComponent } from './components/pesquisador-modal-add/pesquisador-modal-add.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InstitutoListComponent } from './components/instituto/instituto-list/instituto-list.component';
import { InstitutoIndexComponent } from './components/instituto/instituto-index/instituto-index.component';
import { InstitutoSearchComponent } from './components/instituto/instituto-search/instituto-search.component';
import { InstitutoModalComponent } from './components/instituto/instituto-modal/instituto-modal.component';
import { ProducoesIndexComponent } from './components/producoes/producoes-index/producoes-index.component';
import { ModalFiltroComponent } from './components/producoes/componentes/modal-filtro/modal-filtro.component';
import { GrafoIndexComponent } from './components/grafo/grafo-index/grafo-index.component';
import { ModalConfiguracaoComponent } from './components/grafo/componentes/modal-configuracao/modal-configuracao.component';

@NgModule({
  declarations: [AppComponent, PesquisadorComponent, TableListComponent,PesquisadorModalAddComponent, ModalConfirmacaoComponent, InstitutoListComponent,
  InstitutoIndexComponent,
  InstitutoSearchComponent,
  InstitutoModalComponent,ProducoesIndexComponent,ModalFiltroComponent,GrafoIndexComponent,ModalConfiguracaoComponent ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
