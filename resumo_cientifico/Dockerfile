FROM eclipse-temurin:17-jdk-alpine
WORKDIR /App
ARG JAR_FILE
COPY ${JAR_FILE} /App/resumo_cientifico-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "target/resumo_cientifico-0.0.1-SNAPSHOT.jar" ]