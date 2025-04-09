package site.newkiz.kidsnewsserver.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class KidsnewsUpdateRequest {
    private String title;
    private String content;
    private MultipartFile image;
}