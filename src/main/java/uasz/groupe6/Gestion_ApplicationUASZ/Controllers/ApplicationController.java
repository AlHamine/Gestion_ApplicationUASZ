package uasz.groupe6.Gestion_ApplicationUASZ.Controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.ApplicationService;

@RestController
@AllArgsConstructor
@RequestMapping("/application")
public class ApplicationController {
    
    private ApplicationService applicationService;

    @GetMapping
    public List<Application> afficherToutApplications() {
        return applicationService.afficherToutApplication();
    }

    @PostMapping
    public Application ajoutApplication(@RequestBody Application application) {
        return applicationService.ajoutApplication(application);
    }

    @GetMapping("/{id}")
    public Application rechercheApplication(@PathVariable Long id) {
        return applicationService.rechercheApplication(id);
    }

    @DeleteMapping("/{id}")
    public Boolean supprimerApplication(@PathVariable Long id) {
        return applicationService.supprimerApplication(id);
    }

    @PatchMapping("/{id}")
    public Application modifierApplication(@RequestBody Application application) {
       return applicationService.modifierApplication(application);
    }
}
