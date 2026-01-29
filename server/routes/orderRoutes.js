const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, orderController.createOrder);
router.get('/myorders', verifyToken, orderController.getMyOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.get('/', verifyToken, isAdmin, orderController.getAllOrders);
router.put('/:id/status', verifyToken, isAdmin, orderController.updateOrderStatus);

module.exports = router;
