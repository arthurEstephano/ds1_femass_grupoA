import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IInstituto } from '../models/instituto.models';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {

  public ENVIROMENT: string = 'http://localhost:8080/institute/';
  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private httpClient: HttpClient) { }

  getInstitutos(): Observable<IInstituto[]>{
    const url = this.ENVIROMENT + 'list';
    return this.httpClient.get<IInstituto[]>(url);
  }

  addInstitutos(body:IInstituto): Observable<any>{
    const url = this.ENVIROMENT;
    return this.httpClient.post<IInstituto>(url, body);
  }

  getInstitutoFiltrado(body, tipo:string): Observable<IInstituto[]>{
    let tipos = {
      todos:'name-acronym/',
      nome:'name/',
      acronimo:'acronym/',
    }

    console.log("tipos", tipos[tipo])
    let url = this.ENVIROMENT + tipos[tipo] + body

    return this.httpClient.get<IInstituto[]>(url);
  }

  deleteInstituto(id:string): Observable<IInstituto[]>{

    let url = this.ENVIROMENT + id

    return this.httpClient.get<IInstituto[]>(url);
  }
}
