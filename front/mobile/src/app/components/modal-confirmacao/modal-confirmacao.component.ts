import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  templateUrl: './modal-confirmacao.component.html',
  styleUrls: ['./modal-confirmacao.component.scss'],
})
export class ModalConfirmacaoComponent  implements OnInit {
  @Input() textoConfirmacao?:string;
  @Input() alerta?:boolean;
  @Output() positivo = new EventEmitter()
  @Output() close = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
    console.log('abriu modal confirmação', this.alerta)
  }

  closeModal(){
    this.close.emit(false);
  }

  confirmacao(){
    if(this.alerta){
      this.closeModal()
    }else{
      this.positivo.emit()
    }
  }

}
