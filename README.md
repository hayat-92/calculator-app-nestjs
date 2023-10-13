<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Calculator-App (Backend) (NestJS with mongodb as Database)(Grorapid Assignment)

This repository contains the code for a backend system that implements the APIs described in the API Documentation section. The system is built using **Nest.js** as the framework, **MongoDB** as the database, **mongoose** as the ORM for data handling.
<p align="center">
  <a href="https://www.postman.com/docking-module-astronomer-27642082/workspace/calculator-app-grorapid" target="blank">For Postman Api's Click Here</a>
</p>

## Table of Contents
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Instructions to Run the Code](#instructions-to-run-the-code)
- [Instructions to Set Up the Code](#instructions-to-set-up-the-code)
## Getting Started

To get started with this backend system, follow the instructions below.

## API Documentation

### 1. User Registration

**Endpoint**: `POST /auth/register`

Register a new user with the following request:

```json
{
  "username": "example_user",
  "password": "secure_password123",
}
```

Success Response:
```json 
{
    "success": true,
    "data": {
        "username": "example_user",
        "_id": "6528d28d05884cd391c23008",
        "createdAt": "2023-10-13T05:15:57.536Z",
        "updatedAt": "2023-10-13T05:15:57.536Z",
        "__v": 0
    }
}
```
Error Response:
```json
{
  "status": "error",
  "code": "INVALID_REQUEST",
  "message": "Invalid request. Please provide all required fields: username, email, password, full_name."
}
```


### 2. Login

**Endpoint**: `POST /auth/login`

Generate a new access token with the following request:

```json
{
  "username": "example_user",
  "password": "secure_password123"
}
```

Success Response:
```json 
{
    "success": true,
    "token": <generated-token>,
    "user": {
        "username": "example_user",
        "userId": "uniqueUserId"
    }
}
```

### 3. Do Calculations

**Endpoint**: `POST /calculation`
<br/> **Token needed**

Add the name and expression you want to evaluate:

```json
{
  "name":"add",
  "expression":"1+2+6+(6-2)"
}
```

Success Response:
```json 
{
    "success": true,
    "data": {
        "expression": "1+2+6+(6-2)",
        "result": 13,
        "userId": "6528cca2505f8e879ed86248",
        "name": "add",
        "_id": "6528ce43646129f72b863a97",
        "createdAt": "2023-10-13T04:57:39.766Z",
        "updatedAt": "2023-10-13T04:57:39.766Z",
        "__v": 0
    }
}
```
### 4. Recalculate previous calculation

**Endpoint**: `POST /calculation`
<br/>
**Token needed**

Recalculate the previous done calculations.

```json
{
  "name":"add",
  "expression":"1+2+6+(6-2)",
  "Id":<Id of previous calculation>
}
```

Success Response:
```json 
{
    "success": true,
    "data": {
        "expression": "1+2+6+(6-2)",
        "result": 13,
        "userId": "6528cca2505f8e879ed86248",
        "name": "add",
        "_id": "6528ce43646129f72b863a97",
        "createdAt": "2023-10-13T04:57:39.766Z",
        "updatedAt": "2023-10-13T04:57:39.766Z",
        "__v": 0
    }
}
```
### 5. Delete previous calculation

**Endpoint**: `DELETE /calculation/:id`
<br/>
**Token needed**

Delete the previous calculation - pass id as param

Success Response:
```json 
{
 Boolean
}
```
### 6. Get History

**Endpoint**: `GET /calculation/history`
<br/>
**Token needed**

Get history of previous claculations of the signed In User.

Success Response:
```json 
[
    {
        "_id": "6528ce43646129f72b863a97",
        "expression": "1+2+6+(6-2)",
        "result": 13,
        "userId": "6528cca2505f8e879ed86248",
        "name": "add",
        "createdAt": "2023-10-13T04:57:39.766Z",
        "updatedAt": "2023-10-13T04:57:39.766Z",
        "__v": 0
    }
]
```
## Database Schema
#### The database schema includes collections for user registration and storing calculations documents.
- **User Collection**: Stores user information (username, password).
- **Calculation Collection**: Stores (expression, result, userId).

## Instructions to Run the Code
Clone this repository to your local machine.
```
git clone https://github.com/hayat-92/calculator-app-nestjs
```
Install the required dependencies.
```
npm i -g @nestjs/cli
npm install
```
#### Start the Node.js server.
```
npm run start
```
The API should now be accessible at http://localhost:3000/.

## Instructions to Set Up the Code
Before running the code, you need to configure some settings:
- Set up your mongoose connection and update the database configuration in app.module.ts.
- Configure any other environment-specific settings in the passport.strategy.ts file.

The API should now be accessible at http://localhost:3000/. 









