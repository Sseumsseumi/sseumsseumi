FROM openjdk:17-ea-11-jdk-slim
WORKDIR /back
VOLUME /tmp

COPY build/libs/sseumsseumi-0.0.1-SNAPSHOT.jar sseumsseumi.jar

ENV TZ Asia/Seoul

ENTRYPOINT ["java", "-jar", "sseumsseumi.jar"]

EXPOSE 8080