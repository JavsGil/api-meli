
## Introducción
Este es un proyecto realizado en NodeJS con el propósito de interactuar con la API de MercadoLibre y reformar los datos para crear respuestas personalizadas a partir de ellos.

se desarrllo la implementando una arquitectura limpia de manera que sea mas facil escalar en un futuro

## Instalación
*  Clonar el repositorio
* `npm install`
* `npm run dev` para usar Nodemon o `npm start`

## Endpoints
### GET /items/:id
Obtiene los datos de un artículo específico mediante su ID.

### GET /items?q=:query
Obtiene los artículos que coinciden con un parámetro de consulta específico.

## Dependencias
Express: Framework web para manejar las rutas de la API.
Cors: Middleware para manejar el CORS en Express.
Express Rate Limit: Middleware para manejar el límite de solicitudes.
Axios: Para realizar solicitudes HTTP a la API de MercadoLibre.
Nodemon: Herramienta para facilitar el desarrollo y recargar automáticamente el proyecto.