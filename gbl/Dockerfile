# Étape 1 : Utiliser une image Maven + JDK pour compiler le projet
FROM maven:3.9.4-eclipse-temurin-17 AS build
WORKDIR /app

# Copier les fichiers du projet
COPY pom.xml .
COPY src ./src

# Compiler le projet (sans tests pour gagner du temps)
RUN mvn clean package -DskipTests

# Étape 2 : Image finale avec JDK uniquement
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copier le JAR généré depuis l’étape 1
COPY --from=build /app/target/*.jar app.jar

# Exposer le port de Spring Boot
EXPOSE 8080

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
