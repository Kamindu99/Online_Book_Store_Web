# Use the official Maven image to build the project
FROM maven:3.6.3-openjdk-8 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Use the official OpenJDK image as the base image for the runtime
FROM openjdk:8-jdk-slim
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/book-management-0.0.1-SNAPSHOT.jar book-management.jar

# Expose the port that the application will run on
EXPOSE 8080

# Set the entry point for the container (replace with your main class)
ENTRYPOINT ["java", "-jar", "book-management.jar"]
