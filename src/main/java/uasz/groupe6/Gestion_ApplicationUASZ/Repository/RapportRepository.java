package uasz.groupe6.Gestion_ApplicationUASZ.Repository;

//import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Rapport;

@Repository
public interface RapportRepository extends JpaRepository<Rapport,Long> {
    // List<Licence> findByMethodePaiement(String methodePaiement);

    
}
