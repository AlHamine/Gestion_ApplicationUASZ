package uasz.groupe6.Gestion_ApplicationUASZ.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Deploiement;
// L'interface 
/**
 * DeploiementRepository permet de creer et de gerer la base de donnee associee
 */
@Repository
public interface DeploiementRepository extends JpaRepository<Deploiement, Long> {
    
    
}
