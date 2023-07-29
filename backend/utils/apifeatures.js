class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    // console.log(keyword);

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // making copy of query string
    const queryCopy = { ...this.queryStr };

    // removing fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // for filtering price and review
    // console.log(queryCopy);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(queryStr);
    return this;
  }
  pagination(resultsPerPage) {
    let currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
