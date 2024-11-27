# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file and the dependencies
COPY target/Hotels-0.0.1-SNAPSHOT.jar /app/Hotels-0.0.1-SNAPSHOT.jar

EXPOSE 8087

# Specify the command to run on container startup
CMD ["java", "-jar", "Hotels-0.0.1-SNAPSHOT.jar"]
