# BorderGuru
BorderGuru offline test [![Build Status](https://travis-ci.org/ilovelili/border.svg?branch=master)](https://travis-ci.org/ilovelili/border)

## Demo
http://46.101.225.185:4200

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

## Q&A
#### Why did you pick your particular your design? What assumptions did you make, and what tradeoffs did you consider?
    Since The requirements are quite clear, mainly we need to handle the CRUD of the orders. So my implementation on server side provides the typical RESTful CURD APIs.
    My assumption is one order will have only one item like `001, SuperTrader, Steindamm 80, Macbook` instead of multiple items like `001, SuperTrader, Steindamm 80, [Macbook1, Macbook2, Macbook3]` to keep the order data structure simple. (Actually it doesn't matter even if we have to support multiple items in one order, we can easily change the order data structure without touching the main endpoints)

    The main tradeoff I have considered is the item count aggregation. I think MongoDB aggregation is well-performanced and easy to get implemented. That's one of the reason why I select MongoDB as the data storage.

#### What do you like (and dislike) about Node/Javascript compared to other programming languages?    
    IMO the main advantages of Node.js are:

    . A much wider audience and having more modules (npm is quite cool)

    . Easier to use

    However, Node.js/JavaScript also has important side effects like:

    . Due to the dynamically-typed nature, Node.js can not reach the raw performance of CPU or memory bound tasks. 
    And usually we hate runtime errors. (Although this can be solved if you use JavaScript transpilers like TypeScript)

    . JS language features may not be implemented or only be “patched on” as an add-on syntax. This can lead to a messier
    language design compared to languages that integrate features cleanly into their design. A good example of this is 
    concurrent computing with JS. JS best practices for concurrent computing went from a concurrency API (using event-based callbacks), 
    to the devolopment of promises, to the coming support for async generators. These days callback hell is still a serious issue with 
    many Node.js applications; however, this has led to less readable code, slower development, and perhaps even more bugs.

    All this means that the JavaScript language evolves rather slowly (and some would say poorly too), even when good concepts from other languages are known to work better.
    
    BTW my favorite programming language is Go. It has both great package management feature and performance improvement. C# is great as well, but the community(Nuget) is not growing steadily.

## Contact
Min Ju <route666@live.cn>