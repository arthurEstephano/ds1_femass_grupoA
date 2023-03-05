package ds1.grupo1.resumo_cientifico.controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ds1.grupo1.resumo_cientifico.model.Instituto;
import ds1.grupo1.resumo_cientifico.repository.InstitutoRepository;

@RestController
@RequestMapping("/institute")
public class InstitutoController {
    
    private final InstitutoRepository institutoRepository;

    public InstitutoController(InstitutoRepository institutoRepository) {
        this.institutoRepository = institutoRepository;
    }

    @GetMapping("/list")
    public List<Instituto> getInstitutos() {
        return institutoRepository.findAll();
    }

    @PostMapping("/")
    public void gravar(@RequestBody Instituto instituto){
        institutoRepository.save(instituto);
    }
    
}
