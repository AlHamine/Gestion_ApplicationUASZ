package uasz.groupe6.Gestion_ApplicationUASZ.Controllers;
// import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;

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
		Long userId = user.getId(); // Get user ID
		// Generate token
		String jwts = jwtService.getToken(auth.getName(), role);

		// // Build response with the generated token
		// return ResponseEntity.ok()
		// .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
		// .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")

		// .build();
		// }

		// }
		// Build response with the generated token and user ID
		Map<String, Object> response = new HashMap<>();
		response.put("token", "Bearer " + jwts);
		response.put("userId", userId);
		response.put("prenom", user.getPrenom());
		response.put("nom", user.getNom());

		// Add headers
		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.AUTHORIZATION, "Bearer " + jwts);
		headers.add(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization");

		return ResponseEntity.ok()
				.headers(headers)
				.body(response);
	}
}