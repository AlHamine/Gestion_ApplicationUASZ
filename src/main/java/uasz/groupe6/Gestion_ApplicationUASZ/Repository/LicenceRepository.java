package uasz.groupe6.Gestion_ApplicationUASZ.Repository;

//import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;

@Repository
public interface LicenceRepository extends JpaRepository<Licence,String> {
    // List<Licence> findByMethodePaiement(String methodePaiement);

    
}
