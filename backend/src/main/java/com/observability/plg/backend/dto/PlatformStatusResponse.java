package com.observability.plg.backend.dto;

import java.time.Instant;

/**
 * 프론트엔드와 모니터링 도구가 함께 사용할 플랫폼 상태 응답 DTO다.
 * 엔티티가 없는 예제 구조이므로 상태 확인에 필요한 최소 정보만 담는다.
 */
public record PlatformStatusResponse(
        String name,
        String status,
        Instant checkedAt
) {
}
