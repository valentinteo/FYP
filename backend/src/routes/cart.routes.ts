import express from 'express';
import { addToCart, getCart, updateCartItem, deleteCartItem, clearCart } from '../controllers/cart.controller';

const router = express.Router();

router.post('/', addToCart);
router.get('/', getCart);
router.put('/:cartId', updateCartItem);    
router.delete('/clear', clearCart);
router.delete('/:cartId', deleteCartItem);  


export default router;
