package site.newkiz.kidsnewsserver.dto;

import java.time.LocalDateTime;
import java.util.List;

public class KidsnewsArticleDto {
    private int id;
    private String title;
    private String author;
    private String content;
    private int likes;
    private List<ReplyDto> replies;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
