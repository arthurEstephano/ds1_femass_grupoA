package ds1.grupo1.resumo_cientifico.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Pesquisador {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String identificador_lattes;
    private String nome;

    @ManyToOne
    private Instituto instituto;
    
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
    @Override
    public String toString() {
        return "Pesquisador [id=" + id + ", identificador_lattes=" + identificador_lattes + ", nome=" + nome + "]";
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((identificador_lattes == null) ? 0 : identificador_lattes.hashCode());
        result = prime * result + ((nome == null) ? 0 : nome.hashCode());
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
        Pesquisador other = (Pesquisador) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (identificador_lattes == null) {
            if (other.identificador_lattes != null)
                return false;
        } else if (!identificador_lattes.equals(other.identificador_lattes))
            return false;
        if (nome == null) {
            if (other.nome != null)
                return false;
        } else if (!nome.equals(other.nome))
            return false;
        return true;
    }
    
    public Instituto getInstituto() {
        return instituto;
    }
    public void setInstituto(Instituto instituto) {
        this.instituto = instituto;
    }

    
    
}
