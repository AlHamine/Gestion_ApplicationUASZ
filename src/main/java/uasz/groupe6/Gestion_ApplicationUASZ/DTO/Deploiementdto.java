package uasz.groupe6.Gestion_ApplicationUASZ.DTO;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Deploiement;

/**
 * @author Seydina Mouha.... NDIAYE
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Deploiementdto {

    private Long id;
    private String serveur;
    private Date date_deploiement;
    @ManyToOne
    private ApplicationDTO application;
    @ManyToOne
    private String utilisateur;

    public Deploiementdto(Deploiement d) {
        this.id = d.getId();
        this.application = new ApplicationDTO(d.getApplication());
        this.serveur = d.getServeur();
        this.utilisateur = d.getUtilisateur().getPrenom() + " " + d.getUtilisateur().getNom();
        this.date_deploiement = d.getDate_deploiement();
    }

}
