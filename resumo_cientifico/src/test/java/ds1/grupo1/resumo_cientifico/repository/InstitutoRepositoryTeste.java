package ds1.grupo1.resumo_cientifico.repository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;

import ds1.grupo1.resumo_cientifico.repository.InstitutoRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@ExtendWith(SpringExtension.class)
@WebMvcTest(InstitutoRepository.class)
public class InstitutoRepositoryTeste {
    
    @Autowired
    private MockMvc mvc;

    @Test
    void getInstitutosTeste() throws Exception{
        RequestBuilder request = get("/list");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals(null, resultado.getResponse().getContentAsString());
    }

    @Test
    void gravarTeste() throws Exception{
        RequestBuilder request = get("/");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals(null, resultado.getResponse().getContentAsString());
    }

    @Test
    void deleteInstitutoTeste() throws Exception{
        RequestBuilder request = get("/{id}");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals(null, resultado.getResponse().getContentAsString());
    }



    @Test
    void getInstitutoByNomeTeste() throws Exception{
        RequestBuilder request = get("/name/{nome}")
            .param("nome", "Eduardo");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("Eduardo", resultado.getResponse().getContentAsString());
    }

    @Test
    void getInstitutoByAcronimoTeste() throws Exception{
        RequestBuilder request = get("/acronym/{acronimo}")
            .param("acronimo","Ed");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("Ed", resultado.getResponse().getContentAsString());
    }

    @Test
    void getInstitutoByNomeOrAcronimoTeste() throws Exception{
        RequestBuilder request = get("/name-acronym/{busca}")
            .param("busca","Ed");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("Ed", resultado.getResponse().getContentAsString());
    }
}
