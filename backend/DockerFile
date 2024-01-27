# Use the official OpenJDK base image
FROM maven:3.6.3-openjdk-8 AS build
COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:8-jdk-slim
COPY --from=build /target/book-management-0.0.1-SNAPSHOT.jar book-management.jar

# Expose the port that the application will run on
EXPOSE 8080

# Set the entry point for the container (replace with your main class)
ENTRYPOINT ["java", "-jar", "book-management.jar"]
