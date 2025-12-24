FROM maven:3.9-eclipse-temurin-21 AS BUILD

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine AS runtime

WORKDIR /app
COPY --from=BUILD /app/target/*.jar app.jar

CMD ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]
ENTRYPOINT ["java", "-jar" ,"app.jar"]

EXPOSE 8080