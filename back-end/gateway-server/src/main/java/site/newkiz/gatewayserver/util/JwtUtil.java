package site.newkiz.gatewayserver.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import site.newkiz.gatewayserver.entity.enums.TokenType;

@Component
@RequiredArgsConstructor
public class JwtUtil {

  @Value("${jwt.token.secret-key}")
  private String SECRET_KEY;

  @Getter
  @Value("${jwt.token.access-expire-time}")
  private long ACCESS_TOKEN_EXPIRE_TIME;

  @Getter
  @Value("${jwt.token.refresh-expire-time}")
  private long REFRESH_TOKEN_EXPIRE_TIME;

  public String createAccessToken(Integer userId, String name) {
    return createToken(userId, name, TokenType.ACCESS_TOKEN, ACCESS_TOKEN_EXPIRE_TIME);
  }

  public String createRefreshToken(Integer userId, String name) {
    return createToken(userId, name, TokenType.REFRESH_TOKEN, REFRESH_TOKEN_EXPIRE_TIME);
  }

  private String createToken(Integer userId, String name, TokenType tokenType, long expireTime) {
    return Jwts.builder()
        .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
        .setSubject(String.valueOf(userId))
        .claim("name", name)
        .claim("token_type", tokenType)
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + (expireTime * 1000)))
        .signWith(getSigningKey())
        .compact();
  }

  private Key getSigningKey() {
    byte[] keyBytes = SECRET_KEY.getBytes();
    return Keys.hmacShaKeyFor(keyBytes);
  }

  private Claims parseClaims(String token) {
    try{
      return Jwts.parserBuilder()
          .setSigningKey(getSigningKey())
          .build()
          .parseClaimsJws(token)
          .getBody();
    }catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  public Integer getId(String token) {
    return Integer.parseInt(parseClaims(token).getSubject());
  }

}
