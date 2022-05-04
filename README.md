# REST API: Cafeteria with NodeJS

REST server made with [NodeJS](https://nodejs.org/es/) and [MongoDB](https://www.mongodb.com/es).

**API documentation and info:** [Postman docs](https://web.postman.co/collections/7727126-fa15d799-b897-48d5-b197-95121ede80dc?version=latest&workspace=302ec022-de25-4482-842c-23cd7f984d58)

![example](https://i.imgur.com/6lYECCD.png)

REST API created as a project to simulate a cafeteria or restaurant. User management, categories, requests GET, POST, PUT, DELETE and PATCH and token user autentication.

## NPM packages used

- [**bcrypt**](https://www.npmjs.com/package/bcrypt): Password encryptation
- [**body-parser**](https://www.npmjs.com/package/body-parser): Take request parameters
- [**express**](https://www.npmjs.com/package/express): HTTP server
- [**express-fileupload**](https://www.npmjs.com/package/express-fileupload): Files upload
- [**google-auth-library**](https://www.npmjs.com/package/google-auth-library): Google authentication
- [**jsonwebtoken**](https://www.npmjs.com/package/jsonwebtoken): Token authentication
- [**mongoose**](https://www.npmjs.com/package/mongoose): MongoDB connection
- [**mongoose-unique-validator**](https://www.npmjs.com/package/mongoose-unique-validator): MongoDB validation
- [**underscore**](https://www.npmjs.com/package/underscore): Additional JS functionality

## Features

- General features
  - [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) for users, categories and products
  - Role system for users
  - [JWT](https://jwt.io/) token authentication and [Google OAuth](https://cloud.google.com/nodejs/getting-started/authenticate-users)
  - Categories for each product
  - Image upload

- Security
  - Password encryptation with [bcrypt](https://www.npmjs.com/package/bcrypt)
  - URL protection with tokens
  - Images saved in non-public folders
  - Admin and users role system
  - Validation system with [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)
  - Token seeds saved in server side
  - Password protection to prevent being showed in clear text on JSON
  - Category or product linked to the user that created it
  - File extension validation
  - Error capture returning an HTTP code
  - Image URL protected with token

## Install 🐳
I bundled the project in 2 docker containers, however **this project was made with learning purposes and is not maintained, do not use it in a real enviorment!**

### Download the source code
Git clone the project or download the las version from [releases](https://github.com/alesbe/node-restserver/releases)

### Run the containers
Cd into the project root folder, and do `docker-compose up`, this will pull the docker images and start them.

By default, the backend server is running on port `8000`, and mongodb in port `27017`
