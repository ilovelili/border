/**
 * Orders API
 *  
 * @GET /orders get orders (by orderId or company or address)
 * @POST /order create an order
 * @DELETE /order delete an order (by id)
 * @GET /items display how often each item has been ordered 
 */

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const config = require('../configs');
const db = config.database;
const http = require('http');

// MongoDB URL from the docker-compose file
const dbHost = `mongodb://database/${db}`;

// create mongoose schema
const orderSchema = new mongoose.Schema({
    orderId: String,
    company: String,
    address: String,
    item: String,
    lastModified: Date,
});

// create mongoose model
const Order = mongoose.model('Order', orderSchema);

/* GET get orders */
router.get('/orders', (req, res) => {
    'use strict';

    // Connect to mongodb
    mongoose.connect(dbHost);

    let orderId = req.query.orderId,
        company = req.query.company,
        address = req.query.address,
        search = {}; // find all if search is empty object

    // search by orderId, company, address
    if (orderId && company && address) {
        search = {
            orderId: decodeURIComponent(orderId),
            company: decodeURIComponent(company),
            address: decodeURIComponent(address),
        };
    }
    // search by company, address
    else if (company && address) {
        search = {
            company: decodeURIComponent(company),
            address: decodeURIComponent(address),
        };
    }
    // search by orderId, address
    else if (orderId && address) {
        search = {
            orderId: decodeURIComponent(orderId),
            address: decodeURIComponent(address),
        };
    }
    // search by orderId, company
    else if (orderId && company) {
        search = {
            orderId: decodeURIComponent(orderId),
            company: decodeURIComponent(company),
        };
    }
    // search by orderId
    else if (orderId) {
        search = {
            orderId: decodeURIComponent(orderId),
        };
    }
    // search by company
    else if (company) {
        search = {
            company: decodeURIComponent(company),
        };
    } 
    // search by address
    else if (address) {
        search = {
            address: decodeURIComponent(address),
        };
    }

    // find
    Order.find(search, (err, orders) => {
        if (err) res.status(500).send(err);
        res.status(200).json(orders);
    });
});

/* POST create an order */
router.post('/order', (req, res) => {
    'use strict';

    // Connect to mongodb
    mongoose.connect(dbHost);

    let requestBody = req.body;
    let order = new Order({
        orderId: requestBody.orderId,
        company: requestBody.company,
        address: requestBody.address,
        item: requestBody.item,
        lastModified: new Date(),
    });

    order.save(err => {
        if (err) res.status(500).send(err);
        res.status(201).json({ success: true });
    });
});

/* DELETE delete an order */
router.delete('/order', (req, res) => {
    'use strict';

    // Connect to mongodb
    mongoose.connect(dbHost);

    Order.remove({ orderId: decodeURIComponent(req.query.orderId) }, (err, orders) => {
        if (err) res.status(500).send(err);
        res.status(200).json({ success: true });
    });
});

/* GET display how often each item has been ordered by mongo aggregate */
router.get('/items', (req, res) => {
    'use strict';

    // Connect to mongodb
    mongoose.connect(dbHost);

    Order.aggregate([
        {
            $group: {
                _id: {
                    item: "$item",
                },
                count: {
                    $sum: 1
                },
            },
        },
        {
            $sort: {
                count: -1
            },
        },
    ], (err, items) => {
        if (err) res.status(500).send(err);
        res.status(200).json(items);
    });
});

module.exports = router;