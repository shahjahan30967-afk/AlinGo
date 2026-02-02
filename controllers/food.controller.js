const Food = require("../models/Food");
const FoodOrder = require("../models/FoodOrder");

// GET ALL FOOD ITEMS
exports.getFoodItems = async (req, res) => {
  const foods = await Food.find();
  res.json({ success: true, foods });
};

// PLACE FOOD ORDER
exports.placeOrder = async (req, res) => {
  const { items } = req.body; // [{food: id, quantity}]
  
  let totalPrice = 0;
  for (const item of items) {
    const food = await Food.findById(item.food);
    if (food) totalPrice += food.price * item.quantity;
  }

  const order = await FoodOrder.create({
    user: req.user.id,
    items,
    totalPrice
  });

  res.json({ success: true, order });
};

// GET USER ORDERS
exports.getOrders = async (req, res) => {
  const orders = await FoodOrder.find({ user: req.user.id }).populate("items.food");
  res.json({ success: true, orders });
};
