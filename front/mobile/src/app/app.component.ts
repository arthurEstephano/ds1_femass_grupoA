import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pesquisadores', url: '/pesquisador', icon: 'people-circle' },
    { title: 'institutos', url: '/institutos', icon: 'home' },
    { title: 'Produções', url: '/producoes', icon: 'document' },

  ];
  public labels = ['Family'];
  constructor() {}
}
