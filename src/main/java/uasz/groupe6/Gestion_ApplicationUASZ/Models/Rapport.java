package uasz.groupe6.Gestion_ApplicationUASZ.Models;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int nbApplication;
    private int nbApplicationGratuite;
    private int nbLicence;
    private int nbDeploiement;
    private LocalDate date;
    @ManyToMany
    private List<Application> applications;
    @ManyToMany
    private List<Licence> licences;
    @ManyToMany
    private List<Deploiement> deploiements;

    public Rapport(int nbApplication, int nbApplicationGratuite, int nbLicence, int nbDeploiement,
            List<Application> applications, List<Licence> licences, List<Deploiement> deploiements) {
        this.nbApplication = nbApplication;
        this.nbApplicationGratuite = nbApplicationGratuite;
        this.nbLicence = nbLicence;
        this.nbDeploiement = nbDeploiement;
        this.date = LocalDate.now();
        this.applications = applications;
        this.licences = licences;
        this.deploiements = deploiements;
    }

}
