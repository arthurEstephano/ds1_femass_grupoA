import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private valorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Valor inicial');
  private ano : BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private tipo : BehaviorSubject<string> = new BehaviorSubject<string>(null);
  constructor() { }

  getValorAtual(): string {
    return this.valorSubject.getValue();
  }

  setNovoValor(novoValor: string): void {
    this.valorSubject.next(novoValor);
  }

  getValorObservable(): Observable<string> {
    return this.valorSubject.asObservable();
  }

  getAno(): string{
    return this.ano.getValue()
  }

  getTipo(): string{
    return this.tipo.getValue()
  }

  setAno(ano: string): void {
    this.ano.next(ano);
  }

  setTipo(tipo: string): void {
    this.tipo.next(tipo);
  }
}
