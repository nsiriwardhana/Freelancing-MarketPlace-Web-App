package BackEnd.DTO;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FreelancerDTO {
    //create varables for using freelancer entity
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String dob;
    private String nic;
    private Long phone;
    private String userName;
    private String password;
    private String workOn;
    private LocalDate created_at;
  //  private String role;

}
