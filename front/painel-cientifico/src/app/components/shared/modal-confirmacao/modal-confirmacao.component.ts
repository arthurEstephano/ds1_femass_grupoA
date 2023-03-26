import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.css']
})
export class ModalConfirmacaoComponent implements OnInit {
  @Input() textoConfirmacao:string;
  @Output() positivo = new EventEmitter()
  @Output() close = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  closeModal(){
    this.close.emit(false);
  }

  confirmacao(){
    this.positivo.emit()
  }
}
