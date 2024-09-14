# Use an official Maven image to build the package
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and source code to the container
COPY pom.xml /app/
COPY src /app/src/

# Build the package
RUN mvn clean package -DskipTests

# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-alpine

# Set the working directory
WORKDIR /app

# Copy the jar file from the build stage to the container
COPY --from=build /app/target/to_do_app-0.0.1-SNAPSHOT.jar /app/to_do_app-0.0.1-SNAPSHOT.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/to_do_app-0.0.1-SNAPSHOT.jar"]