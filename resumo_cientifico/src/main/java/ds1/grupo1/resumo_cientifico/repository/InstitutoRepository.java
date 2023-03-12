package ds1.grupo1.resumo_cientifico.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ds1.grupo1.resumo_cientifico.model.Instituto;

@Repository
public interface InstitutoRepository extends JpaRepository<Instituto, Long>{
    List<Instituto> findByNomeContaining(String nome);
    List<Instituto> findByAcronimoContaining(String acronimo);
    List<Instituto> findByNomeIgnoreCaseContainingOrAcronimoIgnoreCaseContaining(String nome, String acronimo);
    
}
