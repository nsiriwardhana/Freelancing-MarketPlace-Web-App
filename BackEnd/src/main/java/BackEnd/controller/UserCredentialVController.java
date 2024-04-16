package BackEnd.controller;

import BackEnd.entity.UserCredential;
import BackEnd.service.UserCredentialVService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/User")
public class UserCredentialVController {
    private final UserCredentialVService userCredentialService;

    public UserCredentialVController(UserCredentialVService userCredentialService) {
        this.userCredentialService = userCredentialService;
    }

    @GetMapping("/{userName}/{role}")
    public ResponseEntity<UserCredential> getUsersByUserNameAndRole(
            @PathVariable("userName") String userName,
            @PathVariable("role") String role) {
        UserCredential users = userCredentialService.getUsersByUserNameAndRole(userName, role);
        return ResponseEntity.ok(users);
    }
}
