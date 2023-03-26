import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnChanges {
  public headers:string[] = [];
  @Input() tituloPagina: string;
  @Input() list: any[];
  @Output() openModal = new EventEmitter()
  @Output() remove = new EventEmitter()

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.list.currentValue){
      this.ngOnInit();
    }
  }

  ngOnInit(): void {
    this.getTableHeaders()
    console.log('list', this.list)
  }

  getTableHeaders(){
    // for (let index = 0; index < this.list.length; index++) {

    //   const element = array[index];

    // }
    console.log('list', this.list)
    for (const key in this.list[0]) {
      if(!this.headers.includes(key.toUpperCase()))
        if(key.toUpperCase() != 'ID')
          this.headers.push(key.toUpperCase())
    }
    this.headers = this.headers.sort()
    console.log('header', this.headers)
  }

  openModalAdd(){
    this.openModal.emit(true);
  }

  delete(list){
    this.remove.emit(list);
  }
}
