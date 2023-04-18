package ds1.grupo1.resumo_cientifico.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ds1.grupo1.resumo_cientifico.controller.request.PesquisaRs;
import ds1.grupo1.resumo_cientifico.model.Pesquisa;
import ds1.grupo1.resumo_cientifico.model.Pesquisador;
import ds1.grupo1.resumo_cientifico.repository.PesquisaRepository;
import ds1.grupo1.resumo_cientifico.repository.PesquisadorRepository;

@RestController
@RequestMapping("/research")
public class PesquisaController {
    private final PesquisadorRepository pesquisadorRepository;
    private final PesquisaRepository pesquisaRepository;

    public PesquisaController(PesquisadorRepository pesquisadorRepository, PesquisaRepository pesquisaRepository) {
        this.pesquisadorRepository = pesquisadorRepository;
        this.pesquisaRepository = pesquisaRepository;
    }

    @GetMapping("/list")
    public List<PesquisaRs> getPesquisas() {
        List<Pesquisa> pesquisas = pesquisaRepository.findAll();

        List<PesquisaRs> irs = new ArrayList<PesquisaRs>();
        for (Pesquisa pesquisa : pesquisas) {
            PesquisaRs p = new PesquisaRs();
            p.setAno(pesquisa.getAno());
            p.setId(pesquisa.getId());
            p.setNome(pesquisa.getNome());
            p.setPaginaFinal(pesquisa.getPaginaFinal());
            p.setPaginaInicial(pesquisa.getPaginaInicial());
            p.setPeriodico(pesquisa.getPeriodico());
            p.setTipo(pesquisa.getTipo());
            p.setVolume(pesquisa.getVolume());
            for (Pesquisador prs : pesquisa.getPesquisadores()) {
                p.getPesquisadores().add(prs.getNome());
            }
            irs.add(p);
        }

        return irs;
    }

    /*@GetMapping("/report/{anoInicio}/{anoFim}")
    public List<PesquisaRs> getPesquisaByAno(@PathVariable("anoInicio") Integer ano1, @PathVariable("anoFim") Integer ano2) {
        List<Pesquisa> pesquisas = pesquisaRepository.FindByAnoBetween(ano1, ano2);

        List<PesquisaRs> irs = new ArrayList<PesquisaRs>();
        for (Pesquisa pesquisa : pesquisas) {
            PesquisaRs p = new PesquisaRs();
            p.setAno(pesquisa.getAno());
            p.setId(pesquisa.getId());
            p.setNome(pesquisa.getNome());
            p.setPaginaFinal(pesquisa.getPaginaFinal());
            p.setPaginaInicial(pesquisa.getPaginaInicial());
            p.setPeriodico(pesquisa.getPeriodico());
            p.setPesquisadores(pesquisa.getPesquisadores());
            p.setTipo(pesquisa.getTipo());
            p.setVolume(pesquisa.getVolume());
            irs.add(p);
        }

        return irs;
    }
    */

    /*@GetMapping("/report/{anoInicio}/{anoFim}/{instituto}")
    public List<PesquisaRs> getPesquisaByAnoAndInstituto(@PathVariable("anoInicio") Integer ano1, @PathVariable("anoFim") Integer ano2,
            @PathVariable("instituto") String instituto) {
        List<Pesquisa> pesquisas = pesquisaRepository
                .FindByAnoBetweenAndFindByInstitutoIgnoreCaseContaining(ano1, ano2, instituto);

        List<PesquisaRs> irs = new ArrayList<PesquisaRs>();
        for (Pesquisa pesquisa : pesquisas) {
            PesquisaRs p = new PesquisaRs();
            p.setAno(pesquisa.getAno());
            p.setId(pesquisa.getId());
            p.setNome(pesquisa.getNome());
            p.setPaginaFinal(pesquisa.getPaginaFinal());
            p.setPaginaInicial(pesquisa.getPaginaInicial());
            p.setPeriodico(pesquisa.getPeriodico());
            p.setPesquisadores(pesquisa.getPesquisadores());
            p.setTipo(pesquisa.getTipo());
            p.setVolume(pesquisa.getVolume());
            irs.add(p);
        }

        return irs;
    }
    */

    @PostMapping("/")
    public void gravar(@RequestBody PesquisaRs pesquisaRs) {
        Pesquisa pesquisa = new Pesquisa();
        pesquisa.setAno(pesquisaRs.getAno());
        pesquisa.setNome(pesquisaRs.getNome());
        pesquisa.setPaginaFinal(pesquisaRs.getPaginaFinal());
        pesquisa.setPaginaInicial(pesquisaRs.getPaginaInicial());
        pesquisa.setPeriodico(pesquisaRs.getPeriodico());
        pesquisa.setTipo(pesquisaRs.getTipo());
        pesquisa.setVolume(pesquisaRs.getVolume());

        List<Pesquisador> pesquisadores = pesquisadorRepository.findAll();
        Set <Pesquisador> hashp = new HashSet<>();
        for (String s : pesquisaRs.getPesquisadores()) {
            for (Pesquisador p : pesquisadores) {
                if (p.getIdentificador_lattes().equals(s)){
                    if(pesquisa.getPesquisadores() == null){
                        hashp.add(p);
                        pesquisa.setPesquisadores(hashp);
                    }
                    else{
                        pesquisa.getPesquisadores().add(p);
                    }
                }
            }
        }

        pesquisaRepository.save(pesquisa);
    }

    @DeleteMapping("/{id}")
    public void deletePesquisa(@PathVariable("id") Long id) throws Exception{
        var p = pesquisaRepository.findById(id);

        if(p.isPresent()){
            Pesquisa pesquisa = p.get();
            pesquisaRepository.delete(pesquisa);
        } else {
            throw new Exception("Id não encontrado.");
        }
    }

}