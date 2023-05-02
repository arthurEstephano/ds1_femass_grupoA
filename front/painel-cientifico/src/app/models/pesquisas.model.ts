export interface IPesquisa{
  tipo: string,
  nome: string,
  ano: number,
  periodico: string,
  volume: number,
  paginaInicial: number,
  paginaFinal: number,
  pesquisadores: Array<string>
}
