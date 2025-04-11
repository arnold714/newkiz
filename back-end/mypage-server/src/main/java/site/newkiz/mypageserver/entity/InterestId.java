package site.newkiz.mypageserver.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import site.newkiz.mypageserver.entity.enums.NewsCategory;

@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InterestId implements Serializable {

  private int userId;
  @Enumerated(EnumType.STRING)
  private NewsCategory category;

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (!(o instanceof InterestId)) {
      return false;
    }
    InterestId that = (InterestId) o;
    return Objects.equals(userId, that.userId) &&
        Objects.equals(category, that.category);
  }

  @Override
  public int hashCode() {
    return Objects.hash(userId, category);
  }
}
