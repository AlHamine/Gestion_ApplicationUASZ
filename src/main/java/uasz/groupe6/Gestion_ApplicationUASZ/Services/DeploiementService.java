package uasz.groupe6.Gestion_ApplicationUASZ.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Deploiement;
import uasz.groupe6.Gestion_ApplicationUASZ.Repository.DeploiementRepository;

@Service
public class DeploiementService {
    @Autowired
    private DeploiementRepository deploiementRepository;

    public List<Deploiement> afficherToutDeploiement() {
        return deploiementRepository.findAll();
    }

    public Deploiement ajoutDeploiement(Deploiement d) {
        return deploiementRepository.save(d);
    }

    public Deploiement rechercheDeploiement(Long id) {
        Optional<Deploiement> existe = deploiementRepository.findById(id);
        if (existe.isPresent()) {
            return existe.get();
        }
        return null;
    }

    public Boolean supprimerDeploiement(Long id) {
        Deploiement deploiement = rechercheDeploiement(id);
        if (deploiement != null)
            deploiementRepository.delete(deploiement);
        return (deploiement != null);
    }

    public Deploiement modifierDeploiement(Deploiement update) {
        Deploiement deploiement = rechercheDeploiement(update.getId());
        deploiement.setServeur(update.getServeur());
        deploiement.setDate_deploiement(update.getDate_deploiement());
        // deploiement.setApplication(update.getApplication());
        // deploiement.setUtilisateur(update.getUtilisateur());
        return deploiementRepository.save(deploiement);
    }

}
