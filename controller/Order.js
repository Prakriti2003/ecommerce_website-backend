const { Order } = require("../model/Order");

exports.fetchOrderByUser = async (req, res) => {
  const { userId } = req.user;
  try {
    let orders = await Order.find({ id: userId });
    //   .populate("user")
    //   .populate("product");
    // console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  //this cart we have to get from API body

  const order = new Order(req.body);
  try {
    const doc = await order.save();
    // const result = await doc.populate("product");
    res.status(201).json(doc);
    console.log(doc);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const doc = await Order.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  //   const { id } = req.params;
  //   console.log(id);
  //   try {
  //     console.log(req.body);
  //     const cartItem = await Cart.findByIdAndUpdate(id, req.body, {
  //       new: true,
  //     });
  //     res.status(200).json(cartItem);
  //     console.log(cartItem);
  //   } catch (err) {
  //     res.status(400).json(err);
  //   }
  const { id } = req.params;
  console.log("Received ID:", id);
  try {
    console.log("Request Body:", req.body);
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Optional: Ensures the update adheres to the schema
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
    console.log("Updated Order:", order);
  } catch (err) {
    console.error("Error updating Order:", err);
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  console.log(req.query);

  // Base query to find orders that are not deleted
  // let query = { deleted: { $ne: true } };

  // // Apply category filter if provided
  // if (req.query.category) {
  //   query.category = req.query.category;
  // }

  // // Apply brand filter if provided
  // if (req.query.brand) {
  //   query.brand = req.query.brand;
  // }

  let mongooseQuery = Order.find({ deleted: { $ne: true } });
  let totalOrdersQuery = Order.find({ deleted: { $ne: true } });
  if (req.query.category) {
    mongooseQuery = mongooseQuery.find({ category: req.query.category });
    totalOrdersQuery = totalOrdersQuery.find({
      category: req.query.category,
    });
  }

  if (req.query.brand) {
    mongooseQuery = mongooseQuery.find({ brand: req.query.brand });
    totalOrdersQuery = totalOrdersQuery.find({ brand: req.query.brand });
  }

  // Create a Mongoose query object with the base query
  // let mongooseQuery = Order.find(query);
  // let totalOrdersQuery = Order.find(query);

  // Apply sorting if provided
  if (req.query._sort) {
    const sortField = req.query._sort;
    const sortOrder = sortField.startsWith("-") ? -1 : 1;
    const sortKey = sortOrder === -1 ? sortField.slice(1) : sortField;
    mongooseQuery = mongooseQuery.sort({ [sortKey]: sortOrder });
    totalOrdersQuery = totalOrdersQuery.sort({ [sortKey]: sortOrder });
  }

  // Count total documents matching the query
  const totalDocs = await totalOrdersQuery.countDocuments().exec();
  console.log(totalDocs);

  // Apply pagination if provided
  if (req.query._page && req.query._per_page) {
    const pageSize = parseInt(req.query._per_page, 10);
    const page = parseInt(req.query._page, 10);
    mongooseQuery = mongooseQuery.skip(pageSize * (page - 1)).limit(pageSize);
  }

  try {
    const docs = await mongooseQuery.exec();
    res.status(200).json({ data: docs, items: totalDocs });
  } catch (err) {
    res.status(400).json(err);
    console.error(err);
  }
};
