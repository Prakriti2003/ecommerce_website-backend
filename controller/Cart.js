const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.user;
  try {
    let cartItems = await Cart.find({ user: id })
      .populate("user")
      .populate("product");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  //this cart we have to get from API body
  const { id } = req.user;
  const cart = new Cart({ ...req.body, user: id });
  try {
    const doc = await cart.save();
    const result = await doc.populate("product");
    res.status(201).json(result);
    console.log(result);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

exports.deleteFromCart = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const doc = await Cart.findByIdAndDelete(id);
    res.status(200).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateCart = async (req, res) => {
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
    const cartItem = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, // Optional: Ensures the update adheres to the schema
    });
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }
    res.status(200).json(cartItem);
    console.log("Updated Cart Item:", cartItem);
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(400).json(err);
  }
};
