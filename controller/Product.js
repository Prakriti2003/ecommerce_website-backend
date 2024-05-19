const { Product } = require("../model/Product");

exports.createProduct = async (req, res) => {
  //this product we have to get from API body

  const product = new Product(req.body);
  try {
    const doc = await product.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchProductsByFilter = async (req, res) => {
  // filter = {category:[smatphone, laptops]}
  // sort = {_sort : '-ratings'}
  //pagination = {_page:1, _limit: 10}
  console.log(req.query);

  let query = Product.find({});
  let totalProductsQuery = Product.find({});
  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({
      category: req.query.category,
    });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
  }

  //TODO : Get sorted on discounted price not actual price
  if (req.query._sort) {
    const sortField = req.query._sort;
    const sortOrder = sortField.startsWith("-") ? -1 : 1;
    const sortKey = sortOrder === -1 ? sortField.slice(1) : sortField;
    query = query.sort({ [sortKey]: sortOrder });
    totalProductsQuery = totalProductsQuery.sort({ [sortKey]: sortOrder });
  }

  const totalDocs = await totalProductsQuery.count().exec();
  console.log(totalDocs);

  if (req.query._page && req.query._per_page) {
    const pageSize = parseInt(req.query._per_page, 10);
    const page = parseInt(req.query._page, 10);
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await query.exec();
    // res.set("X-Total-Count", totalDocs);
    res.status(200).json({ data: docs, items: totalDocs });
  } catch (err) {
    res.status(400).json(err);
    console.log(res.json(err));
  }
};

exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};
