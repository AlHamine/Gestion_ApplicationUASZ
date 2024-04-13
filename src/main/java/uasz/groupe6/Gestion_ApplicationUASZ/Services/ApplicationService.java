package uasz.groupe6.Gestion_ApplicationUASZ.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.DTO.ApplicationDTO;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;
import uasz.groupe6.Gestion_ApplicationUASZ.Repository.ApplicationRepository;
import uasz.groupe6.Gestion_ApplicationUASZ.Repository.LicenceRepository;

@Service
@AllArgsConstructor
public class ApplicationService {

    private ApplicationRepository applicationRepository;

    private LicenceRepository licenceRepository;

    public List<Application> afficherToutApplication() {
        return applicationRepository.findAll();
    }
    public List<ApplicationDTO> afficherToutApplicationAvecLicence() {
        return applicationRepository.findAll().stream().map(a -> MapDTO(a)).collect(Collectors.toList());
    }

    public List<Application> afficherToutApplicationGratuite() {
        return applicationRepository.applicationsGratuites();

    }

    // POur ajouter la licence courante vu que l'application peut posseder plusieurs
    // licences
    public ApplicationDTO MapDTO(Application a) {
        ApplicationDTO appDTO = new ApplicationDTO(a);
        appDTO.setLicenceActuel(licenceRepository.trouverLicenceActuelParApplicationId(a.getId()));

        return appDTO;
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

        if (editApplication != null) {
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
