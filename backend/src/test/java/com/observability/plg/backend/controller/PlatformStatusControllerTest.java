package com.observability.plg.backend.controller;

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.observability.plg.backend.dto.PlatformStatusResponse;
import com.observability.plg.backend.service.PlatformStatusService;
import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

@WebMvcTest(PlatformStatusController.class)
class PlatformStatusControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PlatformStatusService platformStatusService;

    @Test
    void getPlatformStatusReturnsServicePayload() throws Exception {
        // 컨트롤러가 비즈니스 로직 없이 서비스 결과만 전달하는지 검증한다.
        given(platformStatusService.getPlatformStatus())
                .willReturn(new PlatformStatusResponse(
                        "observability-backend",
                        "UP",
                        Instant.parse("2026-04-16T00:00:00Z")
                ));

        mockMvc.perform(get("/api/platform/status"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("observability-backend"))
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.checkedAt").value("2026-04-16T00:00:00Z"));
    }
}
