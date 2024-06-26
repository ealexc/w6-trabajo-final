const express = require('express');
const routerUser = require('./user.router');
const routerCategory = require('./category.router');
const routerProduct = require('./product.router');
const { verifyJwt } = require('../utils/verifyJWT');
const routerCart = require('./cart.router');
const routerPurchase = require('./purchase.router');
const routerProductImg = require('./productImg.router');
const router = express.Router();

router.use('/users', routerUser)

router.use('/categories', routerCategory)

router.use('/products', routerProduct)

router.use('/cart', verifyJwt, routerCart)

router.use('/product_images', verifyJwt, routerProductImg)

router.use('/purchase', verifyJwt, routerPurchase)
module.exports = router;