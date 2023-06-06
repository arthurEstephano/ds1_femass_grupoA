import { IPesquisa } from "./pesquisas.model"

export interface IPesquisador {
  id?:number,
  "identificador_lattes": string,
  instituto: string,
  nome:string
}

export interface IPesquisadorPesquisa{
  instituto:string,
  nome:string,
  pesquisas:IPesquisa[]
}
