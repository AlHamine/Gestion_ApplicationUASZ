package uasz.groupe6.Gestion_ApplicationUASZ.Models;

import java.util.Date;
import java.util.List;
import jakarta.persistence.*;
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
    private Date date;
    @ManyToMany
    @JoinTable(name = "rapport_application", joinColumns = @JoinColumn(name = "rapport_id"), inverseJoinColumns = @JoinColumn(name = "application_id"))
    private List<Application> applications;
    @ManyToMany
    @JoinTable(name = "rapport_licence", joinColumns = @JoinColumn(name = "rapport_id"), inverseJoinColumns = @JoinColumn(name = "licence_id"))

    private List<Licence> licences;
    @ManyToMany
    @JoinTable(name = "rapport_deploiement", joinColumns = @JoinColumn(name = "rapport_id"), inverseJoinColumns = @JoinColumn(name = "deploiement_id"))

    private List<Deploiement> deploiements;

    public Rapport(int nbApplication, int nbApplicationGratuite, int nbLicence, int nbDeploiement,
            List<Application> applications, List<Licence> licences, List<Deploiement> deploiements) {
        this.nbApplication = nbApplication;
        this.nbApplicationGratuite = nbApplicationGratuite;
        this.nbLicence = nbLicence;
        this.nbDeploiement = nbDeploiement;
        this.date = new Date();
        this.applications = applications;
        this.licences = licences;
        this.deploiements = deploiements;
    }

}
