package uasz.groupe6.Gestion_ApplicationUASZ;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.AllArgsConstructor;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Application;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.ApplicationService;

@SpringBootApplication
@AllArgsConstructor
public class GestionApplicationUaszApplication implements CommandLineRunner {

	private ApplicationService applicationService;
	public static void main(String[] args) {
		SpringApplication.run(GestionApplicationUaszApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		applicationService.ajoutApplication(new Application(null, "Windows", "11", "Microsoft", "utiliser app mobile", "new Categorie", new Date(), 25, null));
	}
}
