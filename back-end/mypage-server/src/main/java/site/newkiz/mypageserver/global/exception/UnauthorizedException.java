package site.newkiz.mypageserver.global.exception;

import lombok.Getter;
import site.newkiz.mypageserver.global.error.ErrorCode;

@Getter
public class UnauthorizedException extends CustomException {

  private final ErrorCode errorCode;

  public UnauthorizedException(ErrorCode errorCode) {
    super(ErrorCode.UNAUTHORIZED_EXCEPTION.getMessage());
    this.errorCode = errorCode;
  }

  public UnauthorizedException(String message) {
    super(ErrorCode.UNAUTHORIZED_EXCEPTION.getMessage() + " : " + message);
    this.errorCode = ErrorCode.UNAUTHORIZED_EXCEPTION;
  }
}
