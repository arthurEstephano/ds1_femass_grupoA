package ds1.grupo1.resumo_cientifico.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ds1.grupo1.resumo_cientifico.model.Pesquisa;

@Repository
public interface PesquisaRepository extends JpaRepository<Pesquisa, Long>{
    //List<Pesquisa> FindByAnoBetween(Integer ano1, Integer ano2);
    //List<Pesquisa> FindByAnoBetweenAndFindByInstitutoIgnoreCaseContaining(Integer ano1, Integer ano2, String instituto);
    //List<Pesquisa> FindByAnoBetweenAndFindByInstitutoIgnoreCaseContainingAndFindByPesquisadorIgnoreCaseContaining(Integer ano1, Integer ano2, String instituto, String pesquisador);
    //List<Pesquisa> FindByAnoBetweenAndFindByInstitutoIgnoreCaseContainingAndFindByPesquisadorIgnoreCaseContainingAndFindByTipoIgnoreCaseContaining(Integer ano1, Integer ano2, String instituto, String pesquisador, String tipo);
}
