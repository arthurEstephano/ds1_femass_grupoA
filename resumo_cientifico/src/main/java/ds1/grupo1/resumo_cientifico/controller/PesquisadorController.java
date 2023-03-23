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

import ds1.grupo1.resumo_cientifico.repository.InstitutoRepository;
import ds1.grupo1.resumo_cientifico.repository.PesquisadorRepository;
import ds1.grupo1.resumo_cientifico.controller.request.PesquisadorRs;
import ds1.grupo1.resumo_cientifico.model.Instituto;
import ds1.grupo1.resumo_cientifico.model.Pesquisador;

@RestController
@RequestMapping("/researcher")
public class PesquisadorController {
    private final PesquisadorRepository pesquisadorRepository;
    private final InstitutoRepository institutoRepository;

    public PesquisadorController(PesquisadorRepository pesquisadorRepository, InstitutoRepository institutoRepository) {
        this.pesquisadorRepository = pesquisadorRepository;
        this.institutoRepository = institutoRepository;
    }

    @GetMapping("/list")
    public List<PesquisadorRs> getPesquisadores() {
        List<Pesquisador> pesquisadores = pesquisadorRepository.findAll();

        List<PesquisadorRs> irs = new ArrayList<PesquisadorRs>();
        for (Pesquisador pesquisador: pesquisadores){
            PesquisadorRs p = new PesquisadorRs();
            p.setInstituto(pesquisador.getInstituto().getNome());
            p.setIdentificador_lattes(pesquisador.getIdentificador_lattes());
            p.setNome(pesquisador.getNome());
            p.setId(pesquisador.getId());
            irs.add(p);
        }

        return irs;
    }

    @GetMapping("/name/{nome}")
    public List<Pesquisador> getPesquisadorByNome(@PathVariable("nome") String nome){
        return pesquisadorRepository.findByNomeIgnoreCaseContaining(nome);
    }

    @PostMapping("/")
    public void gravar(@RequestBody PesquisadorRs pesquisadorRs) throws Exception{
        Pesquisador pesquisador = new Pesquisador ();
        pesquisador.setIdentificador_lattes(pesquisadorRs.getIdentificador_lattes());
        pesquisador.setNome(pesquisadorRs.getNome());
        
        List<Instituto> institutos = institutoRepository.findAll();

        Instituto instituto = null;
        for (Instituto i : institutos) {
            if (i.getNome().equals(pesquisadorRs.getInstituto())) {
                instituto = i;
            }
        }

        if (instituto==null){
            throw new Exception("Todo pesquisador necessita estar em um instituto.");
        }
        pesquisador.setInstituto(instituto);
        
        pesquisadorRepository.save(pesquisador);
    }

    @DeleteMapping("/{id}")
    public void deleteInstituto(@PathVariable("id") Long id) throws Exception {
        var p = pesquisadorRepository.findById(id);

        if (p.isPresent()){
            Pesquisador pesquisador = p.get();
            pesquisadorRepository.delete(pesquisador);
        } else {
            throw new Exception("Id não encontrado.");
        }
        
    }
}
