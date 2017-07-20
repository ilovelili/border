# BorderGuru
BorderGuru offline test

## Demo
http://188.226.157.229:4200/#/home

    This demo is hosted by my personal DigitalOcean Droplet.

## Requirements
* [Docker:17.06.0-ce (with Docker Compose:1.14.0)](https://docs.docker.com/)

### Docker Images
* [node:8.1.2-alpine](https://hub.docker.com/_/node/)
* [mvertes/alpine-mongo](https://hub.docker.com/r/mvertes/alpine-mongo/)

## Frameworks
* [Angular](https://angular.io/)
* [Express 4](https://expressjs.com/)

## Main Node dependencies (including devDependencies)
* [express](https://www.npmjs.com/package/express)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [supertest](https://www.npmjs.com/package/supertest)
* [tape](https://www.npmjs.com/package/tape)
* [jshint](https://www.npmjs.com/package/jshint)
* [angular](https://www.npmjs.com/package/angular)
* [typescript](https://www.npmjs.com/package/typescript)

## Run
* `docker-compose up`
* access http://localhost:4200

## Endpoints
* Endpoint URL: http://localhost:3000

| Method      | URL             | Auth Needed   | Note                                                           |
| ---         | ---             | ---           | ---                                                        |
| `GET`       | `/health`       | No            | Health check                                               |
| `GET`       | `/api/orders`   | No            | get orders by orderId or company or address                |
| `POST`      | `/api/order`    | No            | Create a new order                                         |
| `DELETE`    | `/api/order`    | No            | Delete an order by orderId                                 |
| `GET`       | `/api/items`    | No             | display how often each item has been ordered in desc order |

## Database
Data Persisted to MongoDB.

### DataTable
    Order
    * _id - Bson Object ID
    * orderId - Order ID (string)
    * company - Company Name (string)
    * address - Address (string)
    * item - Item Name (string)
    * lastModified - last modified time (Date)

## Test
   supertest is used for API testing and intergrated with Travis CI.

## Deployment
I personally perfer [Ansible](http://docs.ansible.com/ansible/docker_module.html).

## TBD
1. mongo db auth
2. PM2 intergration

## Contact
Min Ju <route666@live.cn>