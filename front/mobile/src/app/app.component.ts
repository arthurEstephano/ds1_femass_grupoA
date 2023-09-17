import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pesquisadores', url: '/pesquisador', icon: 'people-circle' },
    { title: 'institutos', url: '/institutos', icon: 'people-circle' },
    { title: 'Produções', url: '/producoes', icon: 'people-circle' },

  ];
  public labels = ['Family'];
  constructor() {}
}
