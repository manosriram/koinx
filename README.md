### Auth APIs
`POST /api/auth/register`
Register a user (accept username, password, type of user - buyer/seller)
```
{
 email
 password
 usertype (buyer or seller)
}
```

POST /api/auth/login
Let a previously registered user log in (e.g. retrieve authentication token)
```
{
 email
 password
}
```

> every authenticated request with need a header (Authorization) with value (Bearer <token>)

### APIs for buyers
GET /api/buyer/list-of-sellers
Get a list of all sellers


GET /api/buyer/seller-catalog/:seller_id
Get the catalog of a seller by seller_id


POST /api/buyer/create-order/:seller_id
Send a list of items to create an order for seller with id = seller_id
```
{
 items: ["productid1", "productid2"]
}
```


### APIs for sellers
POST /api/seller/create-catalog
Send a list of items to create a catalog for a seller
```
{
 items: [
    {
        name: "prod 1",
        price: 1000
    },
    {
        name: "prod 2",
        price: 500
    }
 ]
}
```

GET /api/seller/orders
Retrieve the list of orders received by a seller

## Running application
1. make sure mongod is running
2. run `node server.js` to start application at port 5002
