package uasz.groupe6.Gestion_ApplicationUASZ.Controllers;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.ResponseEntity;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.AccountCredentials;
import uasz.groupe6.Gestion_ApplicationUASZ.Models.Utilisateur;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.JwtService;
import uasz.groupe6.Gestion_ApplicationUASZ.Services.UtilisateurService;

// import uasz.groupe6.Gestion_ApplicationUASZ.Models.AccountCredentials;
// import uasz.groupe6.Gestion_ApplicationUASZ.Models.Utilisateur;
// import uasz.groupe6.Gestion_ApplicationUASZ.Services.JwtService;
// import uasz.groupe6.Gestion_ApplicationUASZ.Services.UtilisateurService;
@RestController
public class LoginController {
	@Autowired
	private JwtService jwtService;
	@Autowired
	UtilisateurService uService;
	@Autowired
	AuthenticationManager authenticationManager;

	@PostMapping("/login")
	public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
		UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(
				credentials.getUsername(),
				credentials.getPassword());

		Authentication auth = authenticationManager.authenticate(creds);

		// Get user role
		Utilisateur user = uService.findByUsername(auth.getName());
		String role = user.getRole();

		// Generate token
		String jwts = jwtService.getToken(auth.getName(), role);

		// Build response with the generated token
		return ResponseEntity.ok()
				.header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
				.header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
				.build();
	}

	
}
