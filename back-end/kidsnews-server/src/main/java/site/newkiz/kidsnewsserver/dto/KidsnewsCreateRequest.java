package site.newkiz.kidsnewsserver.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class KidsnewsCreateRequest {
    private String title;
    private String content;
    private String author;
    private MultipartFile image;
}

