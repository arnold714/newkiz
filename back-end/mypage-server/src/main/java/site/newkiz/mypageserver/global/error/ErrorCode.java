package site.newkiz.mypageserver.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
  UNEXPECTED(HttpStatus.INTERNAL_SERVER_ERROR, "500", "Unexpected exception occurred"),
  BAD_REQUEST_EXCEPTION(HttpStatus.BAD_REQUEST, "400", "Bad request"),
  FORBIDDEN_EXCEPTION(HttpStatus.FORBIDDEN, "401", "Forbidden"),
  NOT_FOUND_EXCEPTION(HttpStatus.NOT_FOUND, "404", "Not found"),
  UNAUTHORIZED_EXCEPTION(HttpStatus.UNAUTHORIZED, "402", "Unauthorized");

  private final HttpStatus status;
  private final String code;
  private final String message;
}