# Address API Spec

## Create Address API

Endpoint : POST /api/contacts/:contactid/addresses

Headers :
- Authorization : token 

Request Body :
```json
{
    "street" : "Jl.jendral sudirman",
    "city" : "yogyakarta",
    "province" : "central java",
    "country" : "indonesia",
    "postal_code" : "Kode Pos" 
}
```

Response Body Success :
```json
{
    "data" : {
    "id" : 1,
    "street" : "Jl.jendral sudirman",
    "city" : "yogyakarta",
    "province" : "central java",
    "country" : "indonesia",
    "postal_code" : "Kode Pos" 
    }
}
```

Response Body Error :
```json
{
    "errors" : "country is required"
}
```

## Update Address API

Endpoint : PUT /api/contacts/:addressId/addresses

Headers :
- Authorization : token 

Request Body :
```json
{
    "id" : 1,
    "street" : "Jl.jendral sudirman",
    "city" : "yogyakarta",
    "province" : "central java",
    "country" : "indonesia",
    "postal_code" : "Kode Pos" 
}
```

Response Body Success :
```json
{
    "data" : [ {
    "id" : 1,
    "street" : "Jl.jendral sudirman",
    "city" : "yogyakarta",
    "province" : "central java",
    "country" : "indonesia",
    "postal_code" : "Kode Pos" 
    },
    {
    "id" : 2,
    "street" : "Jl.jendral sudirman",
    "city" : "yogyakarta",
    "province" : "central java",
    "country" : "indonesia",
    "postal_code" : "Kode Pos" 
    },
    {
    "id" : 3,
    "street" : "Jl.jendral sudirman",
    "city" : "yogyakarta",
    "province" : "central java",
    "country" : "indonesia",
    "postal_code" : "Kode Pos" 
    }
    ]
}
```

Response Body Error :
```json
{
    "errors": "Country is requiered"
}
```

## Get Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token 

Response Body Success :
```json
{
    "data" : {
        "id" : 1,
        "street" : "Jl.jendral sudirman",
        "city" : "yogyakarta",
        "province" : "central java",
        "country" : "indonesia",
        "postal_code" : "Kode Pos" 
    }
}
```

Response Body Error :
```json
{
    "errors" : "contact is not found"
}
```

## List Address API

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token 

Response Body Success :
```json
{
    "data" : [
        {
        "id" : 1,
        "street" : "Jl.jendral sudirman",
        "city" : "yogyakarta",
        "province" : "central java",
        "country" : "indonesia",
        "postal_code" : "Kode Pos" 
        },
        {
        "id" : 2,
        "street" : "Jl.jendral sudirman",
        "city" : "yogyakarta",
        "province" : "central java",
        "country" : "indonesia",
        "postal_code" : "Kode Pos" 
        },
        {
        "id" : 3,
        "street" : "Jl.jendral sudirman",
        "city" : "yogyakarta",
        "province" : "central java",
        "country" : "indonesia",
        "postal_code" : "Kode Pos" 
        }
    ]
}
```

Response Body Error :
```json
{

}
```

## Remove Address API

Endpoint : DELETE /api/contacts/:contactId/addresses
/:addressId
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
    "errors" : "contact is not found"
}
```
