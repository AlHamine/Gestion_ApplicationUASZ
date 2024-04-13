package uasz.groupe6.Gestion_ApplicationUASZ.DTO;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;

/**
 * @author Abdoulaye GAYE
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationDTO {
    private Long id;
    private String nom;
    private String version;
    private String editeur;
    private String fonctionnalite;
    private String categorie;
    private Date dateInstallation;
    private float coutInstallation;
    private Licence licenceActuel;
    private String Utilisateur;

    public ApplicationDTO(Application a) {
        if (a != null) {
            this.id = a.getId();
            this.nom = a.getNom();
            this.version = a.getVersion();
            this.categorie = a.getCategorie();
            this.editeur = a.getEditeur();
            this.coutInstallation = a.getCoutInstallation();
            this.dateInstallation = a.getDateInstallation();
            this.fonctionnalite = a.getFonctionnalite();
            this.Utilisateur = a.getUtilisateur().getPrenom() + " " + a.getUtilisateur().getNom();

        }

    }

}