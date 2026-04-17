package com.observability.plg.backend.controller;

import com.observability.plg.backend.dto.PlatformStatusResponse;
import com.observability.plg.backend.service.PlatformStatusService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 컨트롤러는 요청 매핑과 응답 반환만 담당하고,
 * 실제 상태 계산과 조립은 서비스 계층으로 위임한다.
 */
@RestController
@RequestMapping("/api/platform")
public class PlatformStatusController {

    private final PlatformStatusService platformStatusService;

    public PlatformStatusController(PlatformStatusService platformStatusService) {
        this.platformStatusService = platformStatusService;
    }

    @GetMapping("/status")
    public ResponseEntity<PlatformStatusResponse> getPlatformStatus() {
        return ResponseEntity.ok(platformStatusService.getPlatformStatus());
    }
}
