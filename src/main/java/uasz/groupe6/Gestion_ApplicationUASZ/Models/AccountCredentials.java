package uasz.groupe6.Gestion_ApplicationUASZ.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AccountCredentials {
	private String username;
	private String password;

}
