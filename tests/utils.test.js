const { generatePagination } = require("../app/utils/generatePagination");

describe("Test utils", () => {
  it("should generate pagination data from parameters", async () => {

    const res = generatePagination(1, 10, 46);
    expect(res.totalPages).toEqual(5);
    expect(res.totalElements).toEqual(46);
    expect(res.page).toEqual(1);
    expect(res.size).toEqual(10);
    expect(res.hasNext).toEqual(true);
    expect(res.hasPrevious).toEqual(false);
  });
});
