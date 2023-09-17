import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PesquisadorComponent } from './components/pesquisador/pesquisador.component';
import { InstitutoIndexComponent } from './components/instituto/instituto-index/instituto-index.component';
import { ProducoesIndexComponent } from './components/producoes/producoes-index/producoes-index.component';

const routes: Routes = [
  {
    path: '',
    component:PesquisadorComponent
  },
  {
    path:'pesquisador',
    component:PesquisadorComponent
  },
  {
    path:'institutos',
    component:InstitutoIndexComponent
  },
  {
    path:'producoes',
    component:ProducoesIndexComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
