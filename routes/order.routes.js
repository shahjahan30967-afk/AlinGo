const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // آپ کا آرڈر ماڈل
const auth = require('../middleware/auth'); // وہ مڈل ویئر جو ہم نے ابھی بنایا

// 1. نیا آرڈر بک کریں (صرف لاگ ان کسٹمر کے لیے)
// POST /api/orders/place
router.post('/place', auth, async (req, res) => {
    try {
        const { restaurant, items, totalAmount, deliveryAddress, paymentMethod } = req.body;

        const newOrder = new Order({
            customer: req.user.id, // ٹوکن سے حاصل کردہ کسٹمر ID
            restaurant,
            items,
            totalAmount,
            deliveryAddress,
            paymentMethod
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({ success: true, order: savedOrder });
    } catch (err) {
        res.status(500).json({ success: false, message: "آرڈر بک کرنے میں غلطی", error: err.message });
    }
});

// 2. کسٹمر کی اپنی آرڈر ہسٹری دیکھنا
// GET /api/orders/my-orders
router.get('/my-orders', auth, async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.user.id }).sort({ orderTime: -1 });
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: "آرڈرز لوڈ کرنے میں غلطی" });
    }
});

// 3. رائیڈر کا آرڈر قبول کرنا (صرف رائیڈر کے لیے)
// PUT /api/orders/accept/:orderId
router.put('/accept/:id', auth, async (req, res) => {
    try {
        // چیک کریں کہ کیا لاگ ان یوزر رائیڈر ہے
        if (req.user.role !== 'rider') {
            return res.status(403).json({ message: "صرف رائیڈر ہی آرڈر قبول کر سکتا ہے۔" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { 
                rider: req.user.id, 
                status: 'Preparing' // آرڈر تیاری کے مرحلے میں چلا گیا
            },
            { new: true }
        );

        res.json({ success: true, message: "آرڈر قبول کر لیا گیا", order: updatedOrder });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. آرڈر کا اسٹیٹس اپ ڈیٹ کرنا (جیسے Preparing سے OutForDelivery)
// PATCH /api/orders/status/:id
router.patch('/status/:id', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
