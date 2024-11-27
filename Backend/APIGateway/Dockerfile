
# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jre-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the application JAR file and the dependencies
COPY target/APIGateway-0.0.1-SNAPSHOT.jar /app/APIGateway-0.0.1-SNAPSHOT.jar

EXPOSE 9000

# Specify the command to run on container startup
CMD ["java", "-jar", "APIGateway-0.0.1-SNAPSHOT.jar"]
