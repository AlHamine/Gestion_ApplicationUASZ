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

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Deploiement;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.DeploiementService;

@RestController
@RequestMapping("/deploiement")
public class DeploiementController {
    @Autowired
    private DeploiementService deploiementService;

    @GetMapping
    public List<Deploiement> afficherToutDeploiement() {
        return deploiementService.afficherToutDeploiement();
    }

    @PostMapping
    public Deploiement ajoutDeploiement(@RequestBody Deploiement d) {
        return deploiementService.ajoutDeploiement(d);
    }

    @GetMapping("/{id}")
    public Deploiement rechercheDeploiement(@PathVariable Long id) {
        return deploiementService.rechercheDeploiement(id);
    }

    @DeleteMapping("/{id}")
    public Boolean supprimerDeploiement(@PathVariable Long id) {
        return deploiementService.supprimerDeploiement(id);
    }
    @PatchMapping("/{id}")
    public Deploiement modifierDeploiement(@RequestBody Deploiement update) {
       return deploiementService.modifierDeploiement(update);
      }
  

}
