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

    if (req.query.orderId) {
        // find by id
        Order.find({ orderId: req.query.orderId }, (err, orders) => {
            if (err) res.status(500).send(err);
            res.status(200).json(orders);
        });
    } else if (req.query.company) {
        // find by company
        Order.find({ company: req.query.company }, (err, orders) => {
            if (err) res.status(500).send(err);
            res.status(200).json(orders);
        });
    } else if (req.query.address) {
        // find by address
        Order.find({ address: req.query.address }, (err, orders) => {
            if (err) res.status(500).send(err);
            res.status(200).json(orders);
        });
    } else {
        // find all
        Order.find({}, (err, orders) => {
            if (err) res.status(500).send(err);
            res.status(200).json(orders);
        });
    }
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

    Order.remove({ orderId: req.query.orderId }, (err, orders) => {
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