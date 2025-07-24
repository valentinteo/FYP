import { Request, Response } from 'express';
import Cart from '../models/cart.model';
import Charity from '../models/charity.model';

export const addToCart = async (req: Request, res: Response) => {
    try {
        const user = req.session.user;

        console.log('User session:', req.session.user);


        if (!user || user.type !== 'user') {
            return res.status(401).json({ error: 'Only logged-in users can add to cart' });
        }

        const { cartDonationQuantity, cartCharityId } = req.body;

        if (!cartDonationQuantity || !cartCharityId) {
            return res.status(400).json({ error: 'Missing donation quantity or charity ID' });
        }

        console.log('Received payload:', req.body);

        const newItem = await Cart.create({
            cartDonationQuantity,
            cartCharityId,
            cartUserId: user.id,
        }, {
            returning: false, // ✅ disables OUTPUT INSERTED
        });

        res.status(200).json({ message: 'Added to cart', item: newItem });
    } catch (err: any) {
        console.error('Add to cart error:', err?.original?.message || err.message || err);
        res.status(500).json({ error: err?.original?.message || 'Fail to add to cart' });
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