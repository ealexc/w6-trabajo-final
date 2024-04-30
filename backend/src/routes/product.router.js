const { getAll, create, getOne, remove, update } = require('../controllers/product.controllers');
const express = require('express');
const routerProduct = express.Router();
const { verifyJwt } = require('../utils/verifyJWT');


routerProduct.route('/')
    .get(getAll)
    .post(verifyJwt ,create);

routerProduct.route('/:id')
    .get(getOne)
    .delete(verifyJwt, remove)
    .put(verifyJwt, update);

module.exports = routerProduct;