package com.observability.plg.backend.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.observability.plg.backend.dto.PlatformStatusResponse;
import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import org.junit.jupiter.api.Test;

class PlatformStatusServiceTest {

    @Test
    void getPlatformStatusReturnsStableResponse() {
        // 고정 시계를 주입해 시간 기반 응답도 예측 가능하게 검증한다.
        Clock fixedClock = Clock.fixed(Instant.parse("2026-04-16T00:00:00Z"), ZoneOffset.UTC);
        PlatformStatusService platformStatusService = new PlatformStatusService(fixedClock);

        PlatformStatusResponse response = platformStatusService.getPlatformStatus();

        assertThat(response.name()).isEqualTo("observability-backend");
        assertThat(response.status()).isEqualTo("UP");
        assertThat(response.checkedAt()).isEqualTo(Instant.parse("2026-04-16T00:00:00Z"));
    }
}
