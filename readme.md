**Container**:
    Tomcat 5 muss vorinstalliert sein:
    https://archive.apache.org/dist/tomcat/tomcat-5/v5.0.28/bin/jakarta-tomcat-5.0.28.zip
    CATALINA_HOME muss als Property in maven run config gesetzt sein, z.B: C:\\tools\\jakarta-tomcat-5.0.28
    
**Typescript**:
    Typescript mit npm installieren: npm install -g typescript
    TSC_COMPILER (Installationspfad inkl command von tsc) muss in maven run config gesetzt sein. In Dos-Konsole: where tsc eingeben.
    NPM (Installationspfad inkl command von npm) muss in maven run config gesetzt sein. In Dos-Konsole: where npm eingeben.
    
**Build**
mvn clean install buildet alle sourcen (java und ts/js) und kopiert war in webapps Ordner von Tomcat (hotdeploy geht).
Achtung, am besten files beim entwickeln mit tsc auf console komilieren, fehler sieht man sonst eher nicht.
Java 8 einstellen.
    
**Run**
Link zur Seite ist http://localhost:8080/dvd/index.html
Postman: http://localhost:8080/dvd/api/scopa/all
:)
