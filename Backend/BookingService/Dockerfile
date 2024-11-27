# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file and the dependencies
COPY target/BookingService-0.0.1-SNAPSHOT.jar /app/BookingService-0.0.1-SNAPSHOT.jar

EXPOSE 8082

# Specify the command to run on container startup
CMD ["java", "-jar", "BookingService-0.0.1-SNAPSHOT.jar"]
