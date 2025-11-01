import Cart from "../model/cart-model.js";

export const create = async (req, res) => {
  try {
    const userId = req.userId;
    const  items  = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart must contain at least one item." });
    }


    const existingUser = await Cart.findOne({ userId });
     if (existingUser) {
      existingUser.items = items;
      existingUser.totalProduct = items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      existingUser.totalAmount = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );
      const updatedCart = await existingUser.save();
      return res
        .status(200)
        .json({ message: "Cart updated successfully", cart: updatedCart });
    } else {
      const totalProduct = items.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const totalAmount = items.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      const newCart = new Cart({ userId, items, totalProduct, totalAmount });
      await newCart.save();
      return res
        .status(201)
        .json({ message: "Cart created successfully", newCart });
    }
  } catch (error) {
    console.error("Error creating cart:", error);
    res.status(500).json({ message: "Failed to create cart" });
  }
};
