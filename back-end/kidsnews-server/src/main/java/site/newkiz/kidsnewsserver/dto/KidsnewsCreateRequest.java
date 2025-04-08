package site.newkiz.kidsnewsserver.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KidsnewsCreateRequest {
    private String title;
    private String content;
    private String img;
    private String author;
}

