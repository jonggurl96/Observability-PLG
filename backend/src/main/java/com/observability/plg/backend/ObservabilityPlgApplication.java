package com.observability.plg.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 관측성 예제 백엔드 애플리케이션의 진입점이다.
 * actuator와 사용자용 상태 API를 함께 제공해 Prometheus와 UI가 모두 활용할 수 있게 한다.
 */
@SpringBootApplication
public class ObservabilityPlgApplication {

    public static void main(String[] args) {
        SpringApplication.run(ObservabilityPlgApplication.class, args);
    }
}
