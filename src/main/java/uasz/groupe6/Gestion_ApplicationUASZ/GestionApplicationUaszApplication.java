package uasz.groupe6.Gestion_ApplicationUASZ;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Deploiement;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Utilisateur;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.DeploiementService;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.UtilisateurService;

@SpringBootApplication
public class GestionApplicationUaszApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(GestionApplicationUaszApplication.class, args);
	}

	@Autowired
	DeploiementService deploiementService;

	@Autowired
	UtilisateurService utilisateurService;
	// @Autowired
	// private PasswordEncoder passwordEncoder;

	// public PasswordEncoder passwordEncoder() {
	// 	return new BCryptPasswordEncoder();
	// }

	@SuppressWarnings("deprecation")
	@Override
	public void run(String... args) throws Exception {
		Utilisateur user1 = utilisateurService.createUser("smah@gmail.com", "123", null,
				"ADMIN");
		Utilisateur user2 = utilisateurService.createUser("gaye@gmail.com", "123", null,
				"ADMIN");
		Utilisateur user3 = utilisateurService.createUser("diagne@gmail.com", "123", null,
				"ADMIN");
		Utilisateur user4 = utilisateurService.createUser("marie@gmail.com", "123", null,
				"ADMIN");
		Deploiement d1 = deploiementService.ajoutDeploiement(new Deploiement(null, "google.com", new Date(), null));
		Date date1 = new Date(122, 2, 10); // Date du 10 mars 2022
		Date date2 = new Date(123, 6, 25); // Date du 25 juillet 2023
		for (int i = 0; i < 10; i++) {
			String serveur = "Serveur" + (i + 1); // Serveur fictif
			Date dateDeploiement = (i % 2 == 0) ? date1 : date2; // Alterner entre les deux dates fictives
			deploiementService.ajoutDeploiement(new Deploiement(null, serveur, dateDeploiement, null));

		}
		for (Deploiement d : deploiementService.afficherToutDeploiement()) {
			System.out.println(d.getServeur());

		}
	}

}
