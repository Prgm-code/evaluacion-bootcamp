# Readme para la solucion del servidor .

# Trabajo para ser presentado en tarea en Bootcamp, Master FullStack de Threee Points 

Este codigo es una Api que se conecta a MongoDB a traves de mongodb y esta dockerizada.

Esta Api Responde a las siguientes funciones:

# app.get / :

Lista todos los elemnetos de la coleccion de la BD haciendo un Get a la ruta / ,respondiendo un 200 OK.

# app.post / :

Inserta un arreglo a la coleccion de la base de datos en funcion al codigo del ejemplo presentado en clase basic_server_mongodb.js al realizar un Post a la ruta / , respondiendo con 201 Created.

# app.get /secret : 

Esta ruta responde con la funcion secreta mostrada en clases.



# app.get /find : 

Lista las entradas encontradas en la coleccion segun los datos ingresados en la query.


# app.put /put  :

Inserta una actualizacion a los objetos buscados segun un criterio de busqueda ingresado en query. Si lo encuentra le inserta nuevos datos y si no crea una entrada nueva con los datos ingresados en la query.

# app.delete /delete : 

Elimina una entrada de la coleccion de la base de datos segun un criterio de busqueda ingresado en query. Si lo encuentra lo elimina entregando 200 OK,si no indica Not Found 204 No Content.