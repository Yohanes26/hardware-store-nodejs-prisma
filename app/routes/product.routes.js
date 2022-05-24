module.exports = (app) => {
    const products = require("../controllers/product.controller.js");

    var router = require("express").Router();

    router.get("/", products.findAll);

    app.use("/v1/api/products", router);
};
