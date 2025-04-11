package site.newkiz.gameserver.util;

import java.util.Set;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RedisUtil {

  private final RedisTemplate<String, Object> redisTemplate;

  public void set(String key, Object value) {
    redisTemplate.opsForValue().set(key, value);
  }

  public Object get(String key) {
    return redisTemplate.opsForValue().get(key);
  }

  public void delete(String key) {
    redisTemplate.delete(key);
  }

  public void setex(String key, Object value, long timeout) {
    redisTemplate.opsForValue().set(key, value, timeout, TimeUnit.SECONDS);
  }

  public long getExpire(String key) {
    return redisTemplate.getExpire(key, TimeUnit.SECONDS);
  }

  public boolean hasKey(String key) {
    return Boolean.TRUE.equals(redisTemplate.hasKey(key));
  }

  public Set<String> keys(String pattern) {
    return redisTemplate.keys(pattern);
  }
}