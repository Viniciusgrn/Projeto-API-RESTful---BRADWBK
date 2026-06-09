# ============
#  BUILD STAGE
# ============
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copia apenas arquivos essenciais primeiro (cache de dependências)
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

# Dá permissão e baixa dependências (melhora o cache)
RUN chmod +x ./gradlew && ./gradlew --no-daemon dependencies || true

# Agora copia o projeto completo
COPY . .

# Build final
RUN ./gradlew clean build -x test --no-daemon


# =============
#  RUNTIME STAGE
# =============
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copia o JAR do stage de build
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD java -Dspring.profiles.active=${SPRING_PROFILES_ACTIVE:-default} -jar app.jar
