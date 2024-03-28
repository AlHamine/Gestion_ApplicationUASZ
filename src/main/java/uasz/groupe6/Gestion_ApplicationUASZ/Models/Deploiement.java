package uasz.groupe6.Gestion_ApplicationUASZ.Models;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Seydina Mouha.... NDIAYE
 */

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Deploiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String serveur;
    private Date date_deploiement;
    @ManyToOne
    private Application application;
    @ManyToOne
    private Utilisateur utilisateur;

}
