package uasz.groupe6.Gestion_ApplicationUASZ.Models;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Licence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private Date Date_Expiration;
    private int Nbre_Utilisateur;
    private float Cout_Licence;
    private String Methode_Paiement;

    // @ManyToOne
    // private String Rapport;

    // @OneToOne
    // private String Application;
    
}

