# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body : 
```json 
{
    "username" : "user",
    "password" : "admin",
    "name" : "ichwan"
}
```

Response Body Success :
```json
{
    "data" : {
        "username" : "user",
        "password" : "admin"
    }
}
```

Reaponse Body Error : 
```json
{
    "errors" : "Username Alredy Registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body : 
```json
{
    "username" : "user",
    "password" : "admin"
}
```

Response Body Success : 
```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error :
```json
{
    "errors" : "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token

Request Body :

```json
{
    "name" : "Ichwan", //optional
    "password" : "new password" //optional
}
```

Response Body Success :

```json
{
    "data" : {
        "username" : "ichwan-user",
        "name" : "ichwan-admin"
    }
}
```

Response Body Error : 
```json
{
    "errors" : "Name length max 100"
}
```
## Get User API 

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body Success:
```json
{
    "data" : {
        "username" : "admin",
        "name" : "programmer zaman now"
    }
}
```

Response Body Error 
```json
{
    "errors" : "UnAutorized"
}
```
## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success : 
```json 
{
    "data" : "OK"
}
```

Response Body Error :
```json
{
    "errors" : "Unauthorize"
}
```
