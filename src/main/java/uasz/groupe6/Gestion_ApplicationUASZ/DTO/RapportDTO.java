package uasz.groupe6.Gestion_ApplicationUASZ.DTO;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Rapport;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class RapportDTO {
    private Long id;
    private int nbApplication;
    private int nbApplicationGratuite;
    private int nbLicence;
    private int nbDeploiement;
    private Date date;
    private List<ApplicationDTO> applications;

    private List<LicenceDTO> licences;
    private List<Deploiementdto> deploiements;

    public RapportDTO(Rapport r) {
        this.id = r.getId();
        this.nbApplication = r.getNbApplication();
        this.nbApplicationGratuite = r.getNbApplicationGratuite();
        this.nbLicence = r.getNbLicence();
        this.nbDeploiement = r.getNbDeploiement();
        this.date = r.getDate();
        this.applications = r.getApplications().stream().map(a -> new ApplicationDTO(a))
                .collect(Collectors.toList());
        this.deploiements = r.getDeploiements().stream().map(d -> new Deploiementdto(d)).collect(Collectors.toList());
        this.licences = r.getLicences().stream().map(l -> new LicenceDTO(l)).collect(Collectors.toList());

    }

}
