# TeamknowlogyIUHM

Con esta API REST implementada en Nodejs y MongoDB es posible detectar si una persona tiene diferencias genéticas basándose en su secuencia de ADN. 

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

**Ejemplo json postman** 
{
	"info": {
		"_postman_id": "d2938b30-d688-4f23-8f8d-3e8382dca52c",
		"name": "test",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "mutation",
			"request": {
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"dna\":[\r\n            \"ATGCGA\",\r\n    \"CAGTGC\",\r\n    \"TTATTT\",\r\n    \"AGACGG\",\r\n    \"GCGTCA\",\r\n    \"TCACTG\"]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "https://teamknowlogyiuhm.azurewebsites.net/api/v1/mutation",
					"protocol": "https",
					"host": [
						"teamknowlogyiuhm",
						"azurewebsites",
						"net"
					],
					"path": [
						"api",
						"v1",
						"mutation"
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}

### 2.- Estadisticas de verificación

En el siguiente link, de acuerdo a los registros almacenados en BD,  se devuelva un JSON con las estadísticas de las verificaciones de ADN (proporción estadistica).

Fórmula implementada : num. de casos con mutación/num. de casos sin mutación

Servicio tipo GET
https://teamknowlogyiuhm.azurewebsites.net/api/v1/stats

**Ejemplo json postman** 
{
	"info": {
		"_postman_id": "d2938b30-d688-4f23-8f8d-3e8382dca52c",
		"name": "test",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
	},
	"item": [
		{
			"name": "stats",
			"request": {
				"method": "GET",
				"header": [],
				"url": {
					"raw": "https://teamknowlogyiuhm.azurewebsites.net/api/v1/stats",
					"protocol": "https",
					"host": [
						"teamknowlogyiuhm",
						"azurewebsites",
						"net"
					],
					"path": [
						"api",
						"v1",
						"stats"
					]
				}
			},
			"response": []
		}
	],
	"protocolProfileBehavior": {}
}

# Requisitos de Instalación

### 1.- Node js

### 2.- NPM

### 3.- Mongo DB


### Descargar el proyecto
https://github.com/irvingHerrera/TeamknowlogyIUHM/

### Instalación de dependencias
 npm i

### Ejecución ambiente desarrollo con nodemon
 npm start
 
### Ejecución de pruebas con mocha
 npm test 
 
### Ejecución de coverage con nyc
 npm coverage


