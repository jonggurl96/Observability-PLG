에이전트 정의 파일

기본규칙

1. 코드 생성, 수정 시 한글로 상세한 주석을 첨부
2. 모든 코드는 생성, 수정 후 단위테스트로 제대로 동작하는지 검증

## 1. 프로젝트 개요

This project is a MSA-based system composed of:

- Backend: Spring Boot (Java 25+, Gradle)
- Frontend: Next.js (App Router)
- Infra: Nginx, Grafana, Loki, Promtail, Prometheus

---

## 2. Coding Principles

### General

- Always write clean, readable, production-level code
- Avoid unnecessary abstraction
- Prefer simplicity over cleverness
- Follow existing project conventions strictly

### Naming

- Classes: PascalCase
- Variables/Functions: camelCase
- Constants: UPPER_SNAKE_CASE

---

## 3. Backend (Spring Boot)

### Architecture

- actuator: /health

### Security

- Spring Security 사용 x

---

## 4. Frontend (Next.js)

### Architecture

- App Router 기반
- Server Component 우선 사용

### Rules

- API 호출은 BFF 패턴 적용

### Structure

/app
/api -> BFF
/components -> UI
/services -> API logic

---

## 5. Environment & Secrets

사용 안함

---

## 6. DevOps Rules

### Nginx

- Reverse Proxy 필수
- 환경별 설정 분리

---

## 7. Logging & Monitoring

- Backend:
    - log4j2 사용
    - FileAppender, ConsoleAppender 등 사용 후 Promtail에서 수집

- 로그 레벨: DEBUG

---

## 8. Testing

x

---

## 9. Performance Rules

- 불필요한 렌더링 방지 (React memoization)
- API 응답 최소화

---

## 10. Git Rules

x

---

## 11. Anti-Patterns (절대 금지)

- Controller에 비즈니스 로직 작성
- Entity를 API 응답으로 직접 반환
- 하드코딩된 설정값
- Deprecated API 사용
- DB 쿼리 반복 호출

---

## 12. Agent Instructions (IMPORTANT)

- 기존 코드 스타일을 반드시 유지할 것
- 변경 시 최소한의 수정만 수행할 것
- 새로운 라이브러리 도입 시 이유를 명확히 설명할 것
- 보안 관련 코드는 항상 우선 검토할 것
- 성능 영향이 있는 변경은 반드시 언급할 것

---

## 13. Preferred Stack Versions

- Java: 25+
- Spring Boot: 3.x
- Next.js: 16.0.7

---

## 14. Example Tasks

### Good

- "Refactor service layer without breaking API"
- "Optimize query using fetch join"
- "Convert controller response to DTO"

### Bad

- "Rewrite everything"
- "Change architecture without reason"
