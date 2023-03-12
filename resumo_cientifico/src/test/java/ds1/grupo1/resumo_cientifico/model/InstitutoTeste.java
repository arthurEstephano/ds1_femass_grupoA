package ds1.grupo1.resumo_cientifico.model;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class InstitutoTeste {
    Instituto instituto;
    Long id;
    String nome;
    String acronimo;
    
    @BeforeEach
    void iniciar(){
        instituto = new Instituto();
        id = 10L;
        nome = "Eduardo";
        acronimo = "Ed";  
    }

    @Test
    void idTeste(){
        Long esperado = 10L;
        instituto.setId(id);
        Long atual = instituto.getId();
        assertEquals(esperado, atual);
    }

    @Test
    void nomeTeste(){
        String esperado = "Eduardo";
        instituto.setNome(nome);
        String atual = instituto.getNome();
        assertEquals(esperado, atual);
    }

    @Test
    void acronimoTeste(){
        String esperado = "Ed";
        instituto.setAcronimo(acronimo);
        String atual = instituto.getAcronimo();
        assertEquals(esperado, atual);
    }

    @Test
    void toStringTeste(){
        String esperado = "Instituto: Ed - Eduardo";
        instituto.setAcronimo("Ed");
        instituto.setNome("Eduardo");
        String atual = instituto.toString();
        assertEquals(esperado, atual);
    }

    @Test
    void hashCodeTeste(){
        int esperado = 31;
        int atual = instituto.hashCode();
        assertEquals(esperado, atual);
    }

    @Test
    void equalsTeste(){
        boolean esperado = true;
        boolean atual = instituto.equals(instituto);
        assertEquals(esperado, atual);
    }
}