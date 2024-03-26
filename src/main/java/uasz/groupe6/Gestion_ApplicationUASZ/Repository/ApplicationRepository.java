package uasz.groupe6.Gestion_ApplicationUASZ.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    
}
