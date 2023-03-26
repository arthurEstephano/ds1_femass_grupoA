package ds1.grupo1.resumo_cientifico.controller;
import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ds1.grupo1.resumo_cientifico.controller.request.InstitutoRs;
import ds1.grupo1.resumo_cientifico.model.Instituto;
import ds1.grupo1.resumo_cientifico.repository.InstitutoRepository;

@RestController
@RequestMapping("/institute")
public class InstitutoController {
    
    private final InstitutoRepository institutoRepository;

    public InstitutoController(InstitutoRepository institutoRepository) {
        this.institutoRepository = institutoRepository;
    }

    /**
     * Retorna uma lista dos Institutos.
     */
    @GetMapping("/list")
    public List<InstitutoRs> getInstitutos() {
        List<Instituto> institutos = institutoRepository.findAll();

        List<InstitutoRs> irs = new ArrayList<InstitutoRs>();
        for (Instituto instituto: institutos){
            InstitutoRs i = new InstitutoRs();
            i.setAcronimo(instituto.getAcronimo());
            i.setNome(instituto.getNome());
            i.setId(instituto.getId());
            irs.add(i);
        }

        return irs;
    }

    /**
     * Grava um novo Instituto no repositorio.
     * @param institutoRs : 
     */
    @PostMapping("/")
    public void gravar(@RequestBody InstitutoRs institutoRs){
        Instituto instituto = new Instituto ();
        instituto.setAcronimo(institutoRs.getAcronimo());
        instituto.setNome(institutoRs.getNome());
        
        institutoRepository.save(instituto);
    }

    /**
     * Deleta um Instituto com base no Id.
     * @param id : id de um Instituto.
     */
    @DeleteMapping("/{id}")
    public void deleteInstituto(@PathVariable("id") Long id) throws Exception {
        var i = institutoRepository.findById(id);

        if (i.isPresent()){
            Instituto instituto = i.get();
            institutoRepository.delete(instituto);
        } else {
            throw new Exception("Id não encontrado.");
        }
        
    }

    /**
     * Devolve um Instituto com base em seu nome.
     * @param nome : nome de um Instituto.
     */
    @GetMapping("/name/{nome}")
    public List<Instituto> getInstitutoByNome(@PathVariable("nome") String nome){
        return institutoRepository.findByNomeIgnoreCaseContaining(nome);
    }

    /**
     * Devolve um Instituto com base em seu acronimo.
     * @param acronimo : acronimo de um Instituto.
     */
    @GetMapping("/acronym/{acronimo}")
    public List<Instituto> getInstitutoByAcronimo(@PathVariable("acronimo") String acronimo){
        return institutoRepository.findByAcronimoIgnoreCaseContaining(acronimo);
    }

    /**
     * Realiza a busca de um Instituto utilizando de seu nome ou acronimo.
     * @param busca : acronimo ou nome de um Instituto.
     */
    @GetMapping("/name-acronym/{busca}")
    public List<Instituto> getInstitutoByNomeOrAcronimo(@PathVariable("busca") String busca){
        return institutoRepository.findByNomeIgnoreCaseContainingOrAcronimoIgnoreCaseContaining(busca, busca);
    }
}
