package site.newkiz.mypageserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import site.newkiz.mypageserver.entity.School;

public interface SchoolRepository extends JpaRepository<School, Integer> {

}
