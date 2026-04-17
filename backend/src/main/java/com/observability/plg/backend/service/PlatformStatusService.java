package com.observability.plg.backend.service;

import com.observability.plg.backend.dto.PlatformStatusResponse;
import java.time.Clock;
import java.time.Instant;
import org.springframework.stereotype.Service;

/**
 * 컨트롤러에서 직접 상태 값을 조립하지 않도록 서비스 계층으로 책임을 분리한다.
 * 지금은 단순 상태 응답만 반환하지만, 이후 DB/외부 시스템 점검 로직이 추가되더라도
 * 이 계층만 확장하면 되도록 기본 아키텍처를 잡아 둔다.
 */
@Service
public class PlatformStatusService {

    private final Clock clock;

    public PlatformStatusService() {
        this(Clock.systemUTC());
    }

    PlatformStatusService(Clock clock) {
        this.clock = clock;
    }

    public PlatformStatusResponse getPlatformStatus() {
        return new PlatformStatusResponse(
                "observability-backend",
                "UP",
                Instant.now(clock)
        );
    }
}
