package ds1.grupo1.resumo_cientifico.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ds1.grupo1.resumo_cientifico.model.Pesquisador;

@Repository
public interface PesquisadorRepository extends JpaRepository<Pesquisador, Long>{
    List<Pesquisador> findByNomeIgnoreCaseContaining(String nome);
}
