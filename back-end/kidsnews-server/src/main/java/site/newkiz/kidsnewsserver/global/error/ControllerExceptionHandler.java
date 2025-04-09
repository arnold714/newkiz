package site.newkiz.kidsnewsserver.global.error;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import site.newkiz.kidsnewsserver.global.ApiResponse;
import site.newkiz.kidsnewsserver.global.exception.CustomException;

@Slf4j
@RestControllerAdvice
public class ControllerExceptionHandler {


    // 오류 코드, 메시지, HTTP 상태를 받아 새로운 ResponseEntity를 생성하는 메서드
    private ResponseEntity<ApiResponse<?>> newResponseEntity(CustomException ex) {
        return ResponseEntity.status(ex.getErrorCode().getStatus())
                .body(ApiResponse.error(ex.getErrorCode().getCode(), ex.getMessage()));
    }

    //CustomException을 처리하는 메서드
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<ApiResponse<?>> handleCustomException(CustomException ex) {
        log.debug(ex.getMessage(), ex);
        return newResponseEntity(ex);
    }

    // 일반적인 예외와 런타임 예외를 처리하는 메서드
    @ExceptionHandler({Exception.class})
    public ResponseEntity<ApiResponse<?>> serverErrorHandler(Exception ex) {
        log.error("Unexpected exception occurred: {}", ex.getStackTrace(), ex);
        CustomException customException = new CustomException(ErrorCode.UNEXPECTED,
                "Internal Server Error");
        return newResponseEntity(customException);
    }
}