package site.newkiz.mypageserver.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import site.newkiz.mypageserver.entity.Interest;

public interface InterestRepository extends JpaRepository<Interest, Integer> {

  List<Interest> findAllById_UserId(Integer userId);

  void deleteAllById_UserId(Integer userId);
}
