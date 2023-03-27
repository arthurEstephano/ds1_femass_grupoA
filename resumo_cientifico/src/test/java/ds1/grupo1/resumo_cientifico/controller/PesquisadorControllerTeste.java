package ds1.grupo1.resumo_cientifico.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;


@WebMvcTest(PesquisadorController.class)
public class PesquisadorControllerTeste {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private PesquisadorController pesquisadorController;

    /**
     * Aqui é realizado os testes de integração dos métodos da API de Pesquisador.
     */

     @Test
     void getPesquisadorTeste() throws Exception{
        RequestBuilder request = get("/list");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
     }

     @Test
     void getPesquisadorByNomeTeste() throws Exception{
        RequestBuilder request = get("/name/")
            .param("nome", "");
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
     void deletePesquisadorTeste() throws Exception{
        RequestBuilder request = delete("/");
        MvcResult resultado = mvc.perform(request).andReturn();
        assertEquals("", resultado.getResponse().getContentAsString());
     }
}
