FROM eclipse-temurin:17-jdk-alpine
WORKDIR /App
COPY target/resumo_cientifico-0.0.1-SNAPSHOT.jar /App/resumo_cientifico-0.0.1-SNAPSHOT.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar", "resumo_cientifico-0.0.1-SNAPSHOT.jar" ]