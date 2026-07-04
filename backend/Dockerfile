# Build stage
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Add a script to wait for the database to be ready
RUN echo '#!/bin/sh' > entrypoint.sh && \
    echo 'echo "Waiting for database to start..."' >> entrypoint.sh && \
    echo 'while ! nc -z $DB_HOST $DB_PORT; do' >> entrypoint.sh && \
    echo '  sleep 1' >> entrypoint.sh && \
    echo 'done' >> entrypoint.sh && \
    echo 'echo "Database is ready. Starting backend..."' >> entrypoint.sh && \
    echo 'exec java -jar app.jar' >> entrypoint.sh && \
    chmod +x entrypoint.sh

ENV DB_HOST=localhost
ENV DB_PORT=3306

ENTRYPOINT ["./entrypoint.sh"]
