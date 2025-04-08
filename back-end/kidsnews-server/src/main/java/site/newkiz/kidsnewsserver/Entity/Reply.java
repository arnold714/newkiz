package site.newkiz.kidsnewsserver.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;


public class Reply {

    private String id;
    private String content;
    private String author;
    @Field("user_id")
    private String userId;
    private boolean isUpdated;
    @Field("created_at")
    private LocalDateTime createdAt;
    @Field("updated_at")
    private LocalDateTime updatedAt;
}
