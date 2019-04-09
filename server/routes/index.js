var express = require('express');
var router = express.Router();
var ProductCollection = require('../models/ProductSchema');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', (req, res)=>{
    ProductCollection.find({}, (errors, results)=>{
    if(errors) res.send(errors);
    else res.send(results);
  });
});

router.post('/add', (req, res)=>{
    console.log(req.body);
    ProductCollection.create(req.body, (errors, results)=>{
    if(errors) res.send(errors);
    else res.send(results);
  });
});

router.get('/edit/:id', (req, res)=>{
    ProductCollection.findOne(
        {productID: req.params.id},(errors, results)=>{
        if(errors) res.send(errors);
        else res.send(results);
    });
});

router.put('/editChange/:id', (req, res)=>{
    ProductCollection.updateOne(
        {productID: req.params.id}, req.body,(errors,results)=>{
            if(errors) res.send(errors);
            else res.send(results);
        });
});

router.delete('/delete/:id', (req, res)=>{
    ProductCollection.deleteOne({productID: req.params.id}, (errors, results)=>{
        if(errors) res.send(errors);
        else res.send(results);
    });
});

module.exports = router;
