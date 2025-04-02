package site.newkiz.gatewayserver.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Table("user")
public class User {

  @Id
  private Integer id;
  private String provider;
  private String providerId;
  private String name;
  private String email;


  public User(String provider, String providerId, String name, String email) {
    this.provider = provider;
    this.providerId = providerId;
    this.name = name;
    this.email = email;

  }
}
