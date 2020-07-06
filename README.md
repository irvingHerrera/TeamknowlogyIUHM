# TeamknowlogyIUHM

Con esta API REST implementada en Node js y MogngoDB es posible detectar si una persona tiene diferencias genéticas basándose en su secuencia de ADN. 

Consideraciones :

- Se recibe como parámetro de entrada un array de Strings que representan cada fila de una tabla
de (NxN) con la secuencia del ADN.

- Las letras de los Strings solo pueden ser: (A,T,C,G), las cuales representa cada base nitrogenada del ADN.

- Existe una validación que sólo permite recibir bases nitrogenadas válidas.

- El algoritmo determinará que existe una mutación si se encuentra más de una secuencia de cuatro letras iguales, de forma diagonal, horizontal o vertical.

Ejemplo:

Cadena con Mutación:
String[] dna = {"ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"};

Cadena sin Mutación:
String[] dna = {"ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"}

# Pruebas de funcionalidad:

### 1.- Encontrar Mutación

En el siguiente link, cuando se envia una cadena de adn, el servico implementado responde con **HTTP 200-OK** cuando encuentra una mutación.

En caso contrario(no encuentra la mutación) responde con un **403-Forbidden**  

servicio tipo POST
 https://teamknowlogyiuhm.azurewebsites.net/api/v1/mutation
 
 Cuerpo del mensaje:
 {
   "DNA":[
       "ATGCGA",
       "CAGTGC",
       "TTATTT",
       "AGACGG",
       "GCGTCA",
       "TCACTG"
]}

**NOTA** 
Ejemplos de cadena usanso postam para testear la url propocionada. 

### 2.- Estadisticas de verificación

En el siguiente link, de acuerdo a los registros almacenados en BD,  se devuelva un JSON con las estadísticas de las verificaciones de ADN (proporción estadistica).

Fórmula implementada : num. de casos con mutación/num. de casos sin mutación

Servicio tipo GET
https://teamknowlogyiuhm.azurewebsites.net/api/v1/stats



# Requisitos de Instalación

### 1.- Node js

### 2.- NPM

### 3.- Mongo DB


### Descargar el proyecto
https://github.com/irvingHerrera/TeamknowlogyIUHM/

después de descargar el proyecto hay que realizar la instalación de las dependencias del proyecto con el siguiente comando "npm i"

### Ejecucion ambiente desarrollo con nodemon
 npm start
 
### Ejecucion de pruebas con mocha
 npm test 
 
### Ejecucion de coverage con nyc
 npm coverage


