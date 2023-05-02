import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IInstituto } from '../models/instituto.models';
import { IPesquisa } from '../models/pesquisas.model';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  public ENVIROMENT: string = 'http://localhost:8080/';
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  getInstitutos(): Observable<IInstituto[]>{
    const url = this.ENVIROMENT + 'institute/list';
    return this.httpClient.get<IInstituto[]>(url);
  }

  addInstitutos(body:IInstituto): Observable<any>{
    const url = this.ENVIROMENT+'institute/';
    return this.httpClient.post<IInstituto>(url, body);
  }

  getInstitutoFiltrado(body, tipo:string): Observable<IInstituto[]>{
    let tipos = {
      todos:'name-acronym/',
      nome:'name/',
      acronimo:'acronym/',
    }

    let url = this.ENVIROMENT + 'institute/'+ tipos[tipo] + body

    return this.httpClient.get<IInstituto[]>(url);
  }

  deleteInstituto(id:string): Observable<IInstituto[]>{

    let url = this.ENVIROMENT + 'institute/' + id

    return this.httpClient.delete<IInstituto[]>(url);
  }

  addPesquisador(body:any): Observable<any>{
    const url = this.ENVIROMENT + 'researcher/';
    return this.httpClient.post<any>(url, body);
  }

  addPesquisas(body:any): Observable<IPesquisa[]>{
    const url = this.ENVIROMENT + 'research/';
    return this.httpClient.post<IPesquisa[]>(url, body);
  }

  pesquisasPorInstituto(body:any): Observable<IPesquisa[]>{
    const url = this.ENVIROMENT + `research/report/${body.anoInicio}/${body.anoFim}/${body.instituto}`
    return this.httpClient.get<IPesquisa[]>(url);
  }

  pesquisasPorPesquisador(body:any): Observable<IPesquisa[]>{
    const url = this.ENVIROMENT + `research/report/${body.anoInicio}/${body.anoFim}/researcher/${body.pesquisador}`
    return this.httpClient.get<IPesquisa[]>(url);
  }

  pesquisasPorAno(body:any): Observable<IPesquisa[]>{
    const url = this.ENVIROMENT + `research/report/${body.anoInicio}/${body.anoFim}`
    return this.httpClient.get<IPesquisa[]>(url);
  }

  getPesquisadores(): Observable<any[]>{
    const url = this.ENVIROMENT + 'researcher/list';
    return this.httpClient.get<any[]>(url);
  }

  getPesquisadorFiltrado(body, tipo:string): Observable<any[]>{
    let tipos = {
      todos:'name-acronym/',
      nome:'name/',
      acronimo:'acronym/',
    }

    let url = this.ENVIROMENT + 'researcher/'+ tipo + '/' + body

    return this.httpClient.get<any[]>(url);
  }

  deletePesquisador(id:string): Observable<any[]>{

    let url = this.ENVIROMENT + 'researcher/' + id

    return this.httpClient.delete<any[]>(url);
  }
}
