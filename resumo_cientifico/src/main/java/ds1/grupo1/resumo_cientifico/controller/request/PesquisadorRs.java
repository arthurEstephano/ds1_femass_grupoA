package ds1.grupo1.resumo_cientifico.controller.request;


import jakarta.persistence.ManyToMany;

import java.util.Set;

import ds1.grupo1.resumo_cientifico.model.Pesquisa;


public class PesquisadorRs {
    private Long id;
    private String identificador_lattes;
    private String nome;
    private String instituto;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getIdentificador_lattes() {
        return identificador_lattes;
    }
    public void setIdentificador_lattes(String identificador_lattes) {
        this.identificador_lattes = identificador_lattes;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public String getInstituto() {
        return this.instituto;
    }
    public void setInstituto(String instituto) {
        this.instituto = instituto;
    }
    
    @ManyToMany
    private Set<Pesquisa> pesquisa;

    public Set<Pesquisa> getPesquisa() {
        return pesquisa;
    }
    public void setPesquisa(Set<Pesquisa> pesquisa) {
        this.pesquisa = pesquisa;
    }

    
}
