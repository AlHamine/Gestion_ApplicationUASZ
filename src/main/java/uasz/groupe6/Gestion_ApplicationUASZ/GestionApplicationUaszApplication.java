package uasz.groupe6.Gestion_ApplicationUASZ;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Calendar;
import java.util.Date;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Deploiement;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Licence;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Utilisateur;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.DeploiementService;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.LicenceService;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.UtilisateurService;
// import java.sql.*;
import lombok.AllArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.ApplicationService;

@SpringBootApplication
@AllArgsConstructor
public class GestionApplicationUaszApplication implements CommandLineRunner {

	private ApplicationService applicationService;
	private DeploiementService deploiementService;
	private UtilisateurService utilisateurService;
	private LicenceService licenceService;

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

		// Obtenez la date et l'heure actuelles
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(new Date());

		// Ajoutez 10 minutes
		calendar.add(Calendar.DAY_OF_MONTH, 10);

		// Obtenez la nouvelle date
		Date expirationDate = calendar.getTime();

		Date date1 = new Date(122, 2, 10); // Date du 10 mars 2022
		Date date2 = new Date(123, 6, 25); // Date du 25 juillet 2023

		Application app1 = applicationService
				.ajoutApplication(new Application(null, "Windows", "11", "Microsoft", "utiliser app mobile",
						"new Categorie", expirationDate, 25, null, null, user1, null));

		Application app2 = applicationService
				.ajoutApplication(new Application(null, "Avast", "11", "Avast inco", "Proteger la machine,Antivirus",
						"new Categorie", expirationDate, 25, null, null, user3, null));

		Deploiement d1 = deploiementService
				.ajoutDeploiement(new Deploiement(null, "google.com", new Date(), app1, user1, null));

		Licence licence1 = new Licence();
		licence1.setType("Standard");
		licence1.setDate_Expiration(expirationDate);
		licence1.setNbre_Utilisateur(1);
		licence1.setCout_Licence(100.0f);
		licence1.setMethode_Paiement("Carte Bancaire");
		licence1.setApplication(app1);
		licenceService.ajoutLicence(licence1);

		Licence licence2 = new Licence();
		licence2.setType("Standard");
		licence2.setDate_Expiration(expirationDate);
		licence2.setNbre_Utilisateur(13);
		licence2.setCout_Licence(2000.0f);
		licence2.setMethode_Paiement("Liquide");
		licence2.setApplication(app2);
		licenceService.ajoutLicence(licence2);
		for (int i = 0; i < 10; i++) {
			String serveur = "Serveur" + (i + 1); // Serveur fictif
			Date dateDeploiement = (i % 2 == 0) ? date1 : date2; // Alterner entre les deux dates fictives
			Application app = (i % 2 == 0) ? app1 : app2; // Alterner entre les deux dates fictives
			deploiementService.ajoutDeploiement(new Deploiement(null, serveur, dateDeploiement, app, user1, null));
		}

		for (Deploiement d : deploiementService.afficherToutDeploiement()) {
			System.out.println(d.getServeur());
		}
		Application appgratos = applicationService
				.ajoutApplication(new Application(null, "Vlc", "21", "Vlc.co",
						"utiliser pour regarder des video haute performance",
						"Multimedia", new Date(), 0, null, null, user2, null));

	}

}
