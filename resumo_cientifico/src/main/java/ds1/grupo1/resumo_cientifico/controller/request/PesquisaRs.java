package ds1.grupo1.resumo_cientifico.controller.request;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


public class PesquisaRs {
    private Long id;
    private String tipo;
    private String nome;
    private Integer ano;
    private String periodico;
    private Integer volume;
    private Integer paginaInicial;
    private Integer paginaFinal;
    private List<String>pesquisadores = new ArrayList<String>();
    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public Integer getAno() {
        return ano;
    }
    public void setAno(Integer ano) {
        this.ano = ano;
    }
    public String getPeriodico() {
        return periodico;
    }
    public void setPeriodico(String periodico) {
        this.periodico = periodico;
    }
    public Integer getVolume() {
        return volume;
    }
    public void setVolume(Integer volume) {
        this.volume = volume;
    }
    public Integer getPaginaInicial() {
        return paginaInicial;
    }
    public void setPaginaInicial(Integer paginaInicial) {
        this.paginaInicial = paginaInicial;
    }
    public Integer getPaginaFinal() {
        return paginaFinal;
    }
    public void setPaginaFinal(Integer paginaFinal) {
        this.paginaFinal = paginaFinal;
    }
    public List<String> getPesquisadores() {
        return pesquisadores;
    }
    public void setPesquisadores(List<String> pesquisador) {
        pesquisadores = pesquisador;
    }

}
