package uasz.groupe6.Gestion_ApplicationUASZ.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;
import uasz.groupe6.Gestion_ApplicationUASZ.Repository.LicenceRepository;



@Service
public class LicenceService {
    @Autowired
    private LicenceRepository licenceRepository;

    public List<Licence> afficherToutLicence(){
        return licenceRepository.findAll();
    }

    public Licence ajoutLicence(Licence l){
        return licenceRepository.save(l);
    }

    public Licence rechercheLicence(Long id){
        Optional<Licence> existe = licenceRepository.findById(id);
        if (existe.isPresent()) {
            return existe.get();
            
        }
        return null;
    }

    public Boolean supprimerLicence(Long id){
        Licence licence= rechercheLicence(id);
        if (licence !=null) 
            licenceRepository.delete(licence);
            return (licence !=null);
    }

    public Licence modifierLicence(Licence update){
        Licence licence= rechercheLicence(update.getId());
        licence.setDate_Expiration(update.getDate_Expiration());
        licence.setCout_Licence(update.getCout_Licence());
        licence.setMethode_Paiement(update.getMethode_Paiement());
        licence.setNbre_Utilisateur(update.getNbre_Utilisateur());
        return licenceRepository.save(licence);
    }
    
}
