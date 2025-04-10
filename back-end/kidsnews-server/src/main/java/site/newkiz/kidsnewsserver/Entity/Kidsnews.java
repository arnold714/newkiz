package site.newkiz.kidsnewsserver.Entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Document(collection = "kidsnews")
public class Kidsnews {
    @Id
    private String id;
    private String title;
    private String content;
    private String img;
    private String author;
    @Field("user_id")
    private String userId;
    private int views;
    private int likes;
    @Field("created_at")
    private LocalDateTime createdAt;
    @Field("updated_at")
    private LocalDateTime updatedAt;
    @Field("reply_list")
    private List<Reply> replyList;
}


