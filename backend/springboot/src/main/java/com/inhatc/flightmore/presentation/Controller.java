package com.inhatc.flightmore.presentation;
import com.inhatc.flightmore.domain.NaverMember;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import com.inhatc.flightmore.application.NaverService;
import com.inhatc.flightmore.domain.ServerType;
import org.apache.catalina.Server;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/login")
@RestController
public class Controller {
    private static final Logger log = LoggerFactory.getLogger(Controller.class);
    private final NaverService naverService;

    @SneakyThrows
    @GetMapping("/{serverType}")
    ResponseEntity<Void> redirectAuthCodeRequestUrl
            (@PathVariable("serverType") ServerType serverType,
             HttpServletResponse response) {
        String redirectUrl = naverService.getCodeRequestUrl(serverType);
        System.out.println("Redirecting to: " + redirectUrl);
        log.info("Redirecting to: {}", redirectUrl);
        response.sendRedirect(redirectUrl);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/callback/{serverType}")
    ResponseEntity<NaverMember> login
            (@PathVariable ServerType serverType,
             @RequestParam("code") String code) {
        NaverMember login = naverService.login(serverType, code);
        log.info("반환된 NaverMember: {}", login);
        return ResponseEntity.ok(login);
    }

//    @GetMapping("/logout")
//    ResponseEntity<Long> logout(
//            @PathVariable ServerType serverType,
//            @RequestParam("code") String code
//            ) {
//        Long logout = naverService.logout(serverType, code);
//        return ResponseEntity.ok().build();
//    }
}