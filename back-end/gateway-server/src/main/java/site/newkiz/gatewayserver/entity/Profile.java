package site.newkiz.gatewayserver.entity;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;
import site.newkiz.gatewayserver.entity.enums.Gender;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table("profile")
public class Profile {

  @Id
  private Integer id;
  private Integer userId;
  private String nickname;
  private LocalDate birthday ;
  private String school;
  private Gender gender;

}