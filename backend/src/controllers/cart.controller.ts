import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Charity from '../models/charity.model';

// export const addToCart = async (req: Request, res: Response) => {
//     try {
//         const user = req.session.user;

//         console.log('User session:', req.session.user);


//         if (!user || user.type !== 'user') {
//             return res.status(401).json({ error: 'Only logged-in users can add to cart' });
//         }

//         const { cartDonationQuantity, cartCharityId } = req.body;

//         if (!cartDonationQuantity || !cartCharityId) {
//             return res.status(400).json({ error: 'Missing donation quantity or charity ID' });
//         }

//         console.log('Received payload:', req.body);

//         const newItem = await Cart.create({
//             cartDonationQuantity,
//             cartCharityId,
//             cartUserId: user.id,
//         }, {
//             returning: false, // ✅ disables OUTPUT INSERTED
//         });

//         res.status(200).json({ message: 'Added to cart', item: newItem });
//     } catch (err: any) {
//         console.error('Add to cart error:', err?.original?.message || err.message || err);
//         res.status(500).json({ error: err?.original?.message || 'Fail to add to cart' });
//     }
// };

export const addToCart = async (req: Request, res: Response) => {
  try {
    const user = req.session.user;

    if (!user || typeof user !== 'object' || typeof user.id !== 'number') {
      return res.status(401).json({ error: 'User not logged in or session invalid' });
    }

    const { cartDonationQuantity, cartCharityId } = req.body;

    if (!cartDonationQuantity || !cartCharityId) {
      return res.status(400).json({ error: 'Missing donation quantity or charity ID' });
    }

    console.log('🛒 Payload received:', {
      cartDonationQuantity,
      cartCharityId,
      cartUserId: user.id,
    });

    // ✅ Isolate Sequelize call for better debugging
    let newItem;
    try {
      newItem = await Cart.create({
        cartDonationQuantity,
        cartCharityId,
        cartUserId: user.id,
      });
    } catch (sequelizeErr: any) {
      console.error('🔥 Sequelize error during Cart.create:', sequelizeErr);
      return res.status(500).json({ error: 'Database error when adding to cart' });
    }

    return res.status(200).json({ message: '✅ Added to cart', item: newItem });
  } catch (err: any) {
    console.error('🚨 Add to cart error:', err?.message || err);
    return res.status(500).json({ error: 'Unexpected error while adding to cart' });
  }
};



export const getCart = async (req: Request, res: Response) => {
    try {
        const user = req.session.user;

        if (!user || user.type !== 'user') {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const cart = await Cart.findAll({
            where: { cartUserId: user.id },
            include: [{ model: Charity }]
        });

        res.json({ cart });
    } catch (error) {
        console.error('Failed to fetch cart:', error);
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
};


export const updateCartItem = async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;
        const { cartDonationQuantity } = req.body;

        if (!cartDonationQuantity) {
            return res.status(400).json({ error: 'Donation amount is required' });
        }

        const cartItem = await Cart.findByPk(cartId);
        if (!cartItem) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        cartItem.cartDonationQuantity = cartDonationQuantity;
        await cartItem.save();

        return res.status(200).json({ message: 'Cart item updated', item: cartItem });
    } catch (err: any) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Failed to update cart item' });
    }
};


export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const { cartId } = req.params;

        const deleted = await Cart.destroy({ where: { cartId } });

        if (deleted === 0) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        return res.status(200).json({ message: 'Cart item deleted' });
    } catch (err: any) {
        console.error('Delete error:', err);
        return res.status(500).json({ error: 'Failed to delete cart item' });
    }
};