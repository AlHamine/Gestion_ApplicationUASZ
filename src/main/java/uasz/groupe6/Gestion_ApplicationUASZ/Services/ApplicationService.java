package uasz.groupe6.Gestion_ApplicationUASZ.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;
import uasz.groupe6.Gestion_ApplicationUASZ.Repository.ApplicationRepository;

@Service
@AllArgsConstructor
public class ApplicationService {
    
    private ApplicationRepository applicationRepository;

    public List<Application> afficherToutApplication() {
        return applicationRepository.findAll();
    }

    public Application ajoutApplication(Application application) {
        return applicationRepository.save(application);
    }

    public Application rechercheApplication(Long id) {
        Optional<Application> existe = applicationRepository.findById(id);
        if (existe.isPresent()) {
            return existe.get();
        }
        return null;
    }

    public Boolean supprimerApplication(Long id) {
        Application application = rechercheApplication(id);
        if (application != null)
            applicationRepository.delete(application);
        return (application != null);
    }

    public Application modifierApplication(Application appToUpdate) {
        Application editApplication = rechercheApplication(appToUpdate.getId());

        if(editApplication != null) {
            editApplication.setCategorie(appToUpdate.getCategorie());
            editApplication.setCoutInstallation(appToUpdate.getCoutInstallation());
            editApplication.setDateInstallation(appToUpdate.getDateInstallation());
            editApplication.setEditeur(appToUpdate.getEditeur());
            editApplication.setFonctionnalite(appToUpdate.getFonctionnalite());
            editApplication.setNom(appToUpdate.getNom());
            editApplication.setVersion(appToUpdate.getVersion());

            return applicationRepository.save(editApplication);
        } else {
            return null;
        }
    }
}
