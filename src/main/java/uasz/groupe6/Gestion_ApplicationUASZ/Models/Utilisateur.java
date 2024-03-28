package uasz.groupe6.Gestion_ApplicationUASZ.Models;

import java.util.List;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true)
    private String mail;
    @Column(nullable = false)
    private String password;
    private String prenom;
    private String nom;
    @Column(nullable = false)
    private String role;
    @OneToMany(mappedBy = "utilisateur")
    private List<Deploiement> deploiements;
}