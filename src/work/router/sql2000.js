
var express = require('express');
var router = express.Router();
var healthy = require('~/sql2000/healthy');
var goods = require('~/sql2000/goods');
var pay = require('~/sql2000/pay');
var user = require('~/sql2000/user');


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.post('/healthy', (req, res) => {
    healthy.healthy(req, res)
})

router.post('/syncGoods', (req, res) => {
    goods.sync(req, res)
})

router.post('/syncPay', (req, res) => {
    pay.sync(req, res)
})

router.post('/syncUser', (req, res) => {
    user.sync(req, res)
})

module.exports = router;