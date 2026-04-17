# Gradle 이미지에서 소스를 빌드하고 테스트까지 수행한 뒤 실행 가능한 jar를 만든다.
FROM gradle:jdk25 AS builder
WORKDIR /workspace

COPY build.gradle settings.gradle ./
COPY src ./src

RUN gradle test bootJar --no-daemon

# 런타임 이미지는 JRE만 포함해 용량을 줄이고 실행 책임만 맡긴다.
FROM eclipse-temurin:25-jre
WORKDIR /app

ENV LOG_DIR=/var/log/observability/backend

COPY --from=builder /workspace/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
