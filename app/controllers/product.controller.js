const prisma = require("../../prisma");
const { generatePagination } = require("../utils/generatePagination.js");

exports.findAll = (req, res) => {
    const {
        name,
        page = 1,
        size = 10
    } = req.query;

    const condition = {
        skip: Number(page) === 1 ? 0 : Number(String(page - 1) + "0"),
        take: Number(size),
    };

    if (name) {
        condition.where = { name: { contains: name, mode: "insensitive"}};
    }

    let dataSize = 0;

    prisma.product.count({ where: condition.where })
    .then((data) => {
        dataSize = data;
    }) .catch((err) => {
        res.status(500).send({
            message: err.message || "An error occurred while searching for products count.",
        });
    });

    prisma.product
    .findMany(condition)
    .then((data) => {
        const pagination = generatePagination(Number(page), Number(size), dataSize);

        res.send(
            { 
                data, 
                pagination
            }
        );
    })
    .catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occurred while searching for products.",
        });
    });
};