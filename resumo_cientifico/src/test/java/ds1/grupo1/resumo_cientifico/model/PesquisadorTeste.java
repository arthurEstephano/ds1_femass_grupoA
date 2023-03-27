package ds1.grupo1.resumo_cientifico.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PesquisadorTeste {

    Pesquisador pesquisador;
    Long id;
    String identificador_lattes;
    String nome;

    @BeforeEach
    void iniciar(){
        pesquisador = new Pesquisador();
        id = 10L;
        identificador_lattes = "28";
        nome = "Eduardo"; 
    }

    
    /**
     * Aqui são testados unitariamente os métodos da API de pesquisador
     */

     @Test
     void idTeste(){
         Long esperado = 10L;
         pesquisador.setId(id);
         Long atual = pesquisador.getId();
         assertEquals(esperado, atual);
     }
 
     @Test
     void nomeTeste(){
         String esperado = "Eduardo";
         pesquisador.setNome(nome);
         String atual = pesquisador.getNome();
         assertEquals(esperado, atual);
     }

     @Test
     void idlattesTeste(){
        String esperado = "28";
        pesquisador.setIdentificador_lattes(identificador_lattes);
        String atual = pesquisador.getIdentificador_lattes();
        assertEquals(esperado, atual);
     }

     @Test
     void toStringTeste(){
        String esperado = "Pesquisador [id=10, identificador_lattes=28, nome=Eduardo]";
        pesquisador.setId(id);
        pesquisador.setIdentificador_lattes(identificador_lattes);
        pesquisador.setNome(nome);
        String atual = pesquisador.toString();
        assertEquals(esperado, atual);
     }

     @Test
    void hashCodeTeste(){
        int esperado = 29791;
        int atual = pesquisador.hashCode();
        assertEquals(esperado, atual);
    }

    @Test
    void equalsTeste(){
        boolean esperado = true;
        boolean atual = pesquisador.equals(pesquisador);
        assertEquals(esperado, atual);
    }
}
