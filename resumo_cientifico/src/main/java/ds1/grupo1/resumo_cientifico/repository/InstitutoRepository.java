package ds1.grupo1.resumo_cientifico.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import ds1.grupo1.resumo_cientifico.model.Instituto;

@Repository
public interface InstitutoRepository extends JpaRepository<Instituto, Integer>{
    
}
