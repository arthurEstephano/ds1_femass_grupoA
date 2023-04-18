package ds1.grupo1.resumo_cientifico.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

import java.util.Set;

@Entity
public class Pesquisa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String tipo;
    private String nome;
    private Integer ano;
    private String periodico;
    private Integer volume;
    private Integer paginaInicial;
    private Integer paginaFinal;

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

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((tipo == null) ? 0 : tipo.hashCode());
        result = prime * result + ((nome == null) ? 0 : nome.hashCode());
        result = prime * result + ((ano == null) ? 0 : ano.hashCode());
        result = prime * result + ((periodico == null) ? 0 : periodico.hashCode());
        result = prime * result + ((volume == null) ? 0 : volume.hashCode());
        result = prime * result + ((paginaInicial == null) ? 0 : paginaInicial.hashCode());
        result = prime * result + ((paginaFinal == null) ? 0 : paginaFinal.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Pesquisa other = (Pesquisa) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (tipo == null) {
            if (other.tipo != null)
                return false;
        } else if (!tipo.equals(other.tipo))
            return false;
        if (nome == null) {
            if (other.nome != null)
                return false;
        } else if (!nome.equals(other.nome))
            return false;
        if (ano == null) {
            if (other.ano != null)
                return false;
        } else if (!ano.equals(other.ano))
            return false;
        if (periodico == null) {
            if (other.periodico != null)
                return false;
        } else if (!periodico.equals(other.periodico))
            return false;
        if (volume == null) {
            if (other.volume != null)
                return false;
        } else if (!volume.equals(other.volume))
            return false;
        if (paginaInicial == null) {
            if (other.paginaInicial != null)
                return false;
        } else if (!paginaInicial.equals(other.paginaInicial))
            return false;
        if (paginaFinal == null) {
            if (other.paginaFinal != null)
                return false;
        } else if (!paginaFinal.equals(other.paginaFinal))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Pesquisa [id=" + id + ", tipo=" + tipo + ", nome=" + nome + ", ano=" + ano + ", periodico=" + periodico
                + ", volume=" + volume + ", paginaInicial=" + paginaInicial + ", paginaFinal=" + paginaFinal + "]";
    }

    @ManyToMany
    private Set<Pesquisador> pesquisadores;

    public Set<Pesquisador> getPesquisadores() {
        return pesquisadores;
    }

    public void setPesquisadores(Set<Pesquisador> pesquisadores) {
        this.pesquisadores = pesquisadores;
    }

    
}
