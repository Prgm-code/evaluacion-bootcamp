# README Server Solution .

# Trabajo de evaluación para Bootcamp, Master FullStack de Threee Points 

Este código es una Api que se conecta a MongoDB a través de mongodb y esta dockerizada por lo que contiene los archivos de Dockerfile y docker-compose.yml

La Api Responde a las siguientes funciones:

# app.get / :

Lista todos los elementos de la colección de la BD haciendo un Get a la ruta / ,respondiendo un 200 OK.

# app.post / :

Inserta un arreglo a la colección de la base de datos en función al código del ejemplo presentado en clase basic_server_mongodb.js al realizar un Post a la ruta / , respondiendo con 201 Created.

# app.get /secret : 

Esta ruta responde con la función secreta mostrada en clases.



# app.get /find : 

Lista las entradas encontradas en la colección según los datos ingresados en la query.


# app.put /put  :

Inserta una actualización a los objetos buscados según un criterio de búsqueda ingresado en query. Si lo encuentra le inserta nuevos datos y si no, crea una entrada nueva con los datos ingresados en la query.

# app.delete /delete : 

Elimina una entrada de la colección de la base de datos segun un criterio de búsqueda ingresado en query. Si lo encuentra, lo elimina entregando 200 OK,si no indica Not Found 204 No Content.