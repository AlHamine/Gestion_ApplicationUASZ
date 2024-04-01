package uasz.groupe6.Gestion_ApplicationUASZ.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Rapport;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.RapportService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rapport")
public class RapportController {
    @Autowired
    private RapportService RapportService;

    @GetMapping
    public List<Rapport> afficherToutRapport() {
        return RapportService.afficherToutRapport();
    }

    @PostMapping
    public Rapport ajoutRapport() {
        return RapportService.ajoutRapport();
    }

    @GetMapping(path = "/{id}")
    public Rapport rechercheRapport(@PathVariable Long id) {
        return RapportService.rechercheRapport(id);
    }

    @DeleteMapping("/{id}")
    public Boolean supprimerRapport(@PathVariable Long id) {
        return RapportService.supprimerRapport(id);
    }

    // @PatchMapping("/{id}")
    // public Rapport modifierRapport(@RequestBody Rapport update) {
    // return RapportService.modifierRapport(update);
    // }

}
