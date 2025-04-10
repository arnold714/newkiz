package site.newkiz.kidsnewsserver.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReplyCreateRequest {
    private String content;
    private String author;
}

