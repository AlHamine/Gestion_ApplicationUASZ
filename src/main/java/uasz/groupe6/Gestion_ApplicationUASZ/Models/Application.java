package uasz.groupe6.Gestion_ApplicationUASZ.Models;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Abdoulaye GAYE
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String version;
    private String editeur;
    private String fonctionnalite;
    private String categorie;
    private Date dateInstallation = new Date();
    private float coutInstallation;
    // @JsonIgnore
    // @OneToMany
    // private List<License> licenses;
    // @ManyToOne
    // private Rapport Rapport;
    @JsonIgnore
    @OneToMany(mappedBy ="application" )
    private List<Deploiement> deploiement;
    @ManyToOne
    private Utilisateur Utilisateur;
}