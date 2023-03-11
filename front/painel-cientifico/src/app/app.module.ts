import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router'

import { AppComponent } from './app.component';
import { InstitutoListComponent } from './components/Instituto/instituto-list/instituto-list.component';
import { InstitutoIndexComponent } from './components/Instituto/instituto-index/instituto-index.component';
import { InstitutoSearchComponent } from './components/Instituto/instituto-search/instituto-search.component';
import { InstitutoModalComponent } from './components/Instituto/instituto-modal/instituto-modal.component';

const appRoutes: Routes =  [
  {
    path:'institutos',
    component:InstitutoIndexComponent
  },
]

@NgModule({
  declarations: [
    AppComponent,
    InstitutoListComponent,
    InstitutoIndexComponent,
    InstitutoSearchComponent,
    InstitutoModalComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
