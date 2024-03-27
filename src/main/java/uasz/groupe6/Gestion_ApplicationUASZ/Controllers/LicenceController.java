package uasz.groupe6.Gestion_ApplicationUASZ.Controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.LicenceService;

@RestController
@RequestMapping("/licence")
public class LicenceController {
    
    @Autowired
    private LicenceService licenceService;

    @GetMapping
    public List<Licence> afficherToutLicence(){
        return licenceService.afficherToutLicence();
    }

    @PostMapping
    public Licence ajoutLicence(@RequestBody Licence l){
        return licenceService.ajoutLicence(l);
    }

    @GetMapping("/{id}")
    public Licence recherLicence(@PathVariable String type){
        return licenceService.rechercheLicence(type);
    }

    @DeleteMapping("/{id}")
    public Boolean supprimerLicence(@PathVariable String type){
        return licenceService.supprimerLicence(type); 
    }

    @PatchMapping("/{id}")
    public Licence modifierLicence(@RequestBody Licence update){
        return licenceService.modifierLicence(update);
    }
}
