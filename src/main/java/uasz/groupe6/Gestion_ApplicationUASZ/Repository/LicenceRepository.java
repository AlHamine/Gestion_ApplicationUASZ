package uasz.groupe6.Gestion_ApplicationUASZ.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;

@Repository
public interface LicenceRepository extends JpaRepository<Licence, Long> {

    @Query(value = "SELECT l.* " +
            "FROM licence l " +
            "JOIN application a ON l.application_id = a.id " +
            "WHERE a.id = :idApplication " +
            "AND l.date_expiration >= NOW() " +
            "ORDER BY l.date_expiration ASC " +
            "LIMIT 1", nativeQuery = true)
    Licence trouverLicenceActuelParApplicationId(@Param("idApplication") Long idApplication);
}
