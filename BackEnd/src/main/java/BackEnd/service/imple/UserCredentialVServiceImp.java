package BackEnd.service.imple;

import BackEnd.entity.UserCredential;
import BackEnd.repository.UserCredentialRepo;
import BackEnd.service.UserCredentialVService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserCredentialVServiceImp implements UserCredentialVService {
    private final UserCredentialRepo userCredentialRepository;

    public UserCredentialVServiceImp(UserCredentialRepo userCredentialRepository) {
        this.userCredentialRepository = userCredentialRepository;
    }

    @Override
    public UserCredential getUsersByUserNameAndRole(String userName, String role) {
        return userCredentialRepository.findByUserNameAndRole(userName, role);
    }
}
