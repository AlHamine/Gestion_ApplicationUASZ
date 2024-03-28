package uasz.groupe6.Gestion_ApplicationUASZ.Services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import uasz.groupe6.Gestion_ApplicationUASZ.Models.Utilisateur;
import uasz.groupe6.Gestion_ApplicationUASZ.Repository.UtilisateurRepository;


@Service
public class UserDetailsServiceImpl implements UserDetailsService  {
	@Autowired
	private UtilisateurRepository repository;

	@Override
	public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
		Optional<Utilisateur> user = repository.findByMail(mail); 

		UserBuilder builder = null;
		if (user.isPresent()) {
			Utilisateur currentUser = user.get();
			builder = org.springframework.security.core.userdetails.User.withUsername(mail);
			builder.password(currentUser.getPassword());
			builder.roles(currentUser.getRole());
		} else {
			throw new UsernameNotFoundException("User not found.");
		}

		return builder.build();	    
	}
}
