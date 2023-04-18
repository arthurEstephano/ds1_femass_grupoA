package ds1.grupo1.resumo_cientifico.controller.request;

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
    
}
