import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IInstituto } from '../../../models/instituto.models'


@Component({
  selector: 'app-instituto-list',
  templateUrl: './instituto-list.component.html',
  styleUrls: ['./instituto-list.component.css']
})
export class InstitutoListComponent implements OnInit {
  // public institutoList: IInstituto[] = MockInstitutos;

  @Input() institutoList: IInstituto[];
  @Output() openModal = new EventEmitter()
  @Output() remove = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  openModalAdd(){
    this.openModal.emit(true);
  }

  deleteInstituto(acronimo:string){
    this.remove.emit(acronimo);
  }

}
