package uasz.groupe6.Gestion_ApplicationUASZ.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    @Query(nativeQuery = true,value =  "SELECT a.* FROM application a where (SELECT COUNT(*) from licence WHERE application_id=a.id)=0;")
    List<Application> applicationsGratuites();
}
