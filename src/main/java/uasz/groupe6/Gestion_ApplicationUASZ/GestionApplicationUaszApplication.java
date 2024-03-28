package uasz.groupe6.Gestion_ApplicationUASZ;

import java.util.Date;

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

import lombok.AllArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.ApplicationService;

@SpringBootApplication
@AllArgsConstructor
public class GestionApplicationUaszApplication implements CommandLineRunner {

	private ApplicationService applicationService;
	private DeploiementService deploiementService;
	private UtilisateurService utilisateurService;

	public static void main(String[] args) {
		SpringApplication.run(GestionApplicationUaszApplication.class, args);
	}

	@SuppressWarnings("deprecation")
	@Override
	public void run(String... args) throws Exception {
		Utilisateur user1 = utilisateurService.createUser("smah@gmail.com", "123", "Seydina MOuhamdou Al Hamine",
				"NDIAYE", "ADMIN");
		Utilisateur user2 = utilisateurService.createUser("gaye@gmail.com", "123", "Abdoulaye", "GAYE", "ADMIN");
		Utilisateur user3 = utilisateurService.createUser("diagne@gmail.com", "123", "Souleymane", "DIAGNE", "ADMIN");
		Utilisateur user4 = utilisateurService.createUser("marie@gmail.com", "123", "Marie", "DIOP NDIAYE", "ADMIN");

		Date date1 = new Date(122, 2, 10); // Date du 10 mars 2022
		Date date2 = new Date(123, 6, 25); // Date du 25 juillet 2023

		Application app1 = applicationService
				.ajoutApplication(new Application(null, "Windows", "11", "Microsoft", "utiliser app mobile",
						"new Categorie", new Date(), 25, null, user1));

		Application app2 = applicationService
				.ajoutApplication(new Application(null, "Avast", "11", "Avast inco", "Proteger la machine,Antivirus",
						"new Categorie", new Date(), 25, null, user3));

		Deploiement d1 = deploiementService
				.ajoutDeploiement(new Deploiement(null, "google.com", new Date(), app1, user1));

		for (int i = 0; i < 10; i++) {
			String serveur = "Serveur" + (i + 1); // Serveur fictif
			Date dateDeploiement = (i % 2 == 0) ? date1 : date2; // Alterner entre les deux dates fictives
			Application app = (i % 2 == 0) ? app1 : app2; // Alterner entre les deux dates fictives
			deploiementService.ajoutDeploiement(new Deploiement(null, serveur, dateDeploiement, app, user1));
		}

		for (Deploiement d : deploiementService.afficherToutDeploiement()) {
			System.out.println(d.getServeur());
		}
	}

}
