package site.newkiz.kidsnewsserver.dto;

import java.time.LocalDateTime;

public class ReplyDto {
    private int id;
    private String content;
    private String author;
    private int userId;
    private LocalDateTime createdAt;
    private boolean isUpdated;
}
