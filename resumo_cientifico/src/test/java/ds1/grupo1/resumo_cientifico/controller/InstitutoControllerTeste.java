package ds1.grupo1.resumo_cientifico.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;

import ds1.grupo1.resumo_cientifico.repository.InstitutoRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;

@WebMvcTest(InstitutoController.class)
public class InstitutoControllerTeste {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private InstitutoRepository institutoRepository;

    /**
     * Aqui é realizado os testes de integração dos métodos da API de instituto.
     */
    @Test
    void getInstitutosTeste() throws Exception{
        RequestBuilder request = get("/list");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
    }

    @Test
    void gravarTeste() throws Exception{
        RequestBuilder request = post("/");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
    }

    @Test
    void deleteInstitutoTeste() throws Exception{
        RequestBuilder request = delete("/");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
    }

    @Test
    void getInstitutoByNomeTeste() throws Exception{
        RequestBuilder request = get("/name/")
            .param("nome", "");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
    }

    @Test
    void getInstitutoByAcronimoTeste() throws Exception{
        RequestBuilder request = get("/acronym/")
            .param("acronimo","");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
    }

    @Test
    void getInstitutoByNomeOrAcronimoTeste() throws Exception{
        RequestBuilder request = get("/name-acronym/")
            .param("busca","");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
    }
}