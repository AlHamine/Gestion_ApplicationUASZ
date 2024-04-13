package uasz.groupe6.Gestion_ApplicationUASZ.DTO;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LicenceDTO {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private Date date_Expiration;
    private int nbre_Utilisateur;
    private float Cout_Licence;
    private String methode_Paiement;

    private ApplicationDTO application;

    public LicenceDTO(Licence l) {
        this.id = l.getId();
        this.type = l.getType();
        this.date_Expiration = l.getDate_Expiration();
        this.Cout_Licence = l.getCout_Licence();
        this.methode_Paiement = l.getMethode_Paiement();
        this.nbre_Utilisateur = l.getNbre_Utilisateur();
        this.application = new ApplicationDTO(l.getApplication());

    }

}
