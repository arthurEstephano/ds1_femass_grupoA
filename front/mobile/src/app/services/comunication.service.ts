import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ComunicationService {
  private valorSubject: BehaviorSubject<string> = new BehaviorSubject<string>('Valor inicial');
  private ano : BehaviorSubject<string|null> = new BehaviorSubject<any>(null);
  private tipo : BehaviorSubject<string| null> = new BehaviorSubject<any>(null);
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

  getAno(): string | null{
    return this.ano.getValue()
  }

  getTipo(): string | null{
    return this.tipo.getValue()
  }

  setAno(ano: string | null): void {
    this.ano.next(ano);
  }

  setTipo(tipo: string | null): void {
    this.tipo.next(tipo);
  }
}
