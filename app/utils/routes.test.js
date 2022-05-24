const request = require("supertest");
const prisma = require("../prisma");
const app = require("../server");
const { size } = require("lodash");

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Test findAll endpoint", () => {
  it("Should get all products paginated getting the first page and by a default size 10", async () => {
    const res = await request(app).get("/v1/api/products");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("pagination");
    expect(size(res.body.data)).toEqual(10);
  });

  it("Should get all products paginated with varying size", async () => {
    let res = await request(app).get("/v1/api/products?size=5");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("pagination");
    expect(size(res.body.data)).toEqual(5);

    res = await request(app).get("/v1/api/products?size=20");

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
    expect(res.body).toHaveProperty("pagination");
    expect(size(res.body.data)).toEqual(20);
  });

  it("Should get all products paginated with varying page", async () => {
    const resPageOne = await request(app).get("/v1/api/products?page=1");

    expect(resPageOne.statusCode).toEqual(200);
    expect(resPageOne.body).toHaveProperty("data");
    expect(size(resPageOne.body.data)).toEqual(10);

    const resPageTwo = await request(app).get("/v1/api/products?page=2");

    expect(resPageTwo.statusCode).toEqual(200);
    expect(resPageTwo.body).toHaveProperty("data");
    expect(resPageTwo.body.data.length).toEqual(10);

    const resPageThree = await request(app).get("/v1/api/products?page=3");

    expect(resPageThree.statusCode).toEqual(200);
    expect(resPageThree.body).toHaveProperty("data");
    expect(resPageThree.body.data.length).toEqual(8);
  });
});
