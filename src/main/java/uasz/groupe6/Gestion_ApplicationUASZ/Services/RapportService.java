package uasz.groupe6.Gestion_ApplicationUASZ.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Rapport;
import uasz.groupe6.Gestion_ApplicationUASZ.Repository.RapportRepository;

@Service
public class RapportService {
    @Autowired
    private RapportRepository RapportRepository;
    @Autowired
    private LicenceService licenceService;
    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private DeploiementService deploiementService;

    public List<Rapport> afficherToutRapport() {
        return RapportRepository.findAll();
    }

    public Rapport ajoutRapport() {
        return RapportRepository.save(new Rapport(applicationService.afficherToutApplication().size(),
                applicationService.afficherToutApplicationGratuite().size(),
                licenceService.afficherToutLicence().size(),
                deploiementService.afficherToutDeploiement().size(),
                applicationService.afficherToutApplication(),
                licenceService.afficherToutLicence(),
                deploiementService.afficherToutDeploiement()));
    }

    public Rapport rechercheRapport(Long id) {
        Optional<Rapport> existe = RapportRepository.findById(id);
        if (existe.isPresent()) {
            return existe.get();
        }
        return null;
    }

    public Boolean supprimerRapport(Long id) {
        Rapport Rapport = rechercheRapport(id);
        if (Rapport != null)
            RapportRepository.delete(Rapport);
        return (Rapport != null);
    }

    // public Rapport modifierRapport(Rapport update) {
    // Rapport Rapport = rechercheRapport(update.getId());
    // Rapport.setServeur(update.getServeur());
    // Rapport.setDate_Rapport(update.getDate_Rapport());
    // // Rapport.setApplication(update.getApplication());
    // // Rapport.setUtilisateur(update.getUtilisateur());
    // return RapportRepository.save(Rapport);
    // }

}
