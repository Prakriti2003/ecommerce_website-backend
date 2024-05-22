const { Order } = require("../model/Order");

exports.fetchOrderByUser = async (req, res) => {
  const { user } = req.query;
  try {
    let orders = await Order.find({ user: user });
    //   .populate("user")
    //   .populate("product");
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
