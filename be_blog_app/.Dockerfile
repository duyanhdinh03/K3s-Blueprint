# Build stage
FROM eclipse-temurin:21-jdk-jammy as builder
WORKDIR /workspace
COPY target/reddit-clone-1.0.0.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract

# Optimized runtime stage
FROM eclipse-temurin:21-jre-jammy

# Security enhancements
RUN addgroup --system appgroup && \
    adduser --system --no-create-home --ingroup appgroup appuser

WORKDIR /app

# Copy extracted layers from builder
COPY --from=builder --chown=appuser:appgroup /workspace/dependencies/ ./
COPY --from=builder --chown=appuser:appgroup /workspace/spring-boot-loader/ ./
COPY --from=builder --chown=appuser:appgroup /workspace/snapshot-dependencies/ ./
COPY --from=builder --chown=appuser:appgroup /workspace/application/ ./

# Security context
USER appuser

# JVM optimization flags
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75 -XX:+UseZGC -XX:+AlwaysPreTouch -XX:MaxGCPauseMillis=200"

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} org.springframework.boot.loader.JarLauncher"]