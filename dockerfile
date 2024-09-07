# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory
WORKDIR /app

# Copy the jar file to the container
COPY target/to_do_app-0.0.1-SNAPSHOT.jar /app/to_do_app-0.0.1-SNAPSHOT.jar

# Expose the port the app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app/to_do_app-0.0.1-SNAPSHOT.jar"]