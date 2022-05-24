exports.generatePagination = (page, size, dataSize) => {
    const totalPages = Math.ceil(dataSize / size);

    return {
        totalPages,
        totalElements: dataSize,
        page: page,
        size: size,
        hasNext: totalPages > page ? true : false,
        hasPrevious: page === 1 || page === 0 ? false : true
    };
};
