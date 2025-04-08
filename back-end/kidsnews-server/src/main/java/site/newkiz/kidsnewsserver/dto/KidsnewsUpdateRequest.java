package site.newkiz.kidsnewsserver.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class KidsnewsUpdateRequest {
    private String title;
    private String content;
    private String img;
}