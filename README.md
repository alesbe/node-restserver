# REST API: Cafetería con NodeJS

Servidor REST creado con [NodeJS](https://nodejs.org/es/) y [MongoDB](https://www.mongodb.com/es).

**Documentación e información de uso:** [Postman docs](https://web.postman.co/collections/7727126-fa15d799-b897-48d5-b197-95121ede80dc?version=latest&workspace=302ec022-de25-4482-842c-23cd7f984d58)

![example](https://i.imgur.com/6lYECCD.png)

REST API creada como proyecto de un curso de NodeJS, orientado a una posible implementación en un Café o Restaurante. Gestión de usuarios, categorías y productos con peticiones GET, POST, PUT, DELETE y PATCH y autenticación por token.

## NPM packages usados

- [**bcrypt**](https://www.npmjs.com/package/bcrypt): Encriptación de contraseñas.
- [**body-parser**](https://www.npmjs.com/package/body-parser): Tomar los parametros de las peticiones.
- [**express**](https://www.npmjs.com/package/express): Servidor HTTP.
- [**express-fileupload**](https://www.npmjs.com/package/express-fileupload): Subida de archivos.
- [**google-auth-library**](https://www.npmjs.com/package/google-auth-library): Autenticación por google.
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken): Autenticación por token.
- [**mongoose**](https://www.npmjs.com/package/mongoose): Conexión con MongoDB.
- [**mongoose-unique-validator**](https://www.npmjs.com/package/mongoose-unique-validator): Plugin para mongoose de validación.
- [**underscore**](https://www.npmjs.com/package/underscore): Funciones adicionales de JavaScript.

## Caracteristicas

- Características generales
  - Operaciones [CRUD](https://es.wikipedia.org/wiki/CRUD) para usuarios, categorías y productos.
  - Sistema de roles para cada usuario
  - Autenticación por [JWT](https://jwt.io/) y [Google OAuth](https://cloud.google.com/nodejs/getting-started/authenticate-users)
  - Categorías para cada producto
  - Subida de imágenes

- Seguridad
  - Encriptación de contraseñas con [bcrypt](https://www.npmjs.com/package/bcrypt).
  - Protección de URLS con tokens.
  - Guardado de imágenes en carpetas no publicas.
  - Sistema de roles de usuario y administrador.
  - Sistema de validación con [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator) para validar el contenido que se introduce en la base de datos
  - SEEDs de token guardadas en variables de entorno en el servidor.
  - Protección de contraseñas para que no se muestren en las respuestas JSON.
  - Categoría o producto ligada al nombre del usuario que la ha creado.
  - Validación de extensión de archivo.
  - Captura de errores devolviendo un status HTTP.
  - URL de la imagen protegida con token.

## Instalación
- 1.- Descargar la [última versión del servidor](https://github.com/Nexobeta28/node-restserver/releases)
- 2.- Configurar las [variables de entorno](https://github.com/Nexobeta28/node-restserver/blob/master/server/config/config.js) en el servidor.
- 3.- Configurar el [Google Client ID](https://cloud.google.com/nodejs/getting-started/authenticate-users) para usar la autenticación por Google.
- 4.- Descargar las dependencias con `npm install`.
- 5.- Iniciar el servidor con `npm start` o `node server/server`.