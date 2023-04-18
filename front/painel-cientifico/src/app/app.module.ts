import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { InstitutoListComponent } from './components/Instituto/instituto-list/instituto-list.component';
import { InstitutoIndexComponent } from './components/Instituto/instituto-index/instituto-index.component';
import { InstitutoSearchComponent } from './components/Instituto/instituto-search/instituto-search.component';
import { InstitutoModalComponent } from './components/Instituto/instituto-modal/instituto-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { PesquisadorIndexComponent } from './components/pesquisador/pesquisador-index/pesquisador-index.component';
import { FiltroComponent } from './components/shared/filtro/filtro.component';
import { TableListComponent } from './components/shared/table-list/table-list.component';
import { ModalConfirmacaoComponent } from './components/shared/modal-confirmacao/modal-confirmacao.component';
import { PesquisadorModalAddComponent } from './components/pesquisador/pesquisador-modal-add/pesquisador-modal-add.component';
import { ProducoesIndexComponent } from './components/producaoes/producoes-index/producoes-index.component';

const appRoutes: Routes =  [
  {
    path:'institutos',
    component:InstitutoIndexComponent
  },
  {
    path:'pesquisador',
    component:PesquisadorIndexComponent
  },{
    path:'producoes',
    component:ProducoesIndexComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    InstitutoListComponent,
    InstitutoIndexComponent,
    InstitutoSearchComponent,
    InstitutoModalComponent,
    PesquisadorIndexComponent,
    FiltroComponent,
    TableListComponent,
    ModalConfirmacaoComponent,
    PesquisadorModalAddComponent,
    ProducoesIndexComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
