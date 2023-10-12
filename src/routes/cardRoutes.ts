// src/routes/cardRoutes.ts
import express from 'express';
import { body } from 'express-validator';
import CardController from '../controllers/cardController';

const router = express.Router();

router.post(
  '/create-token',
  [
    body('email')
      .isEmail()
      .custom(value => {
        // Check if the email address contains one of the allowed domains
        const allowedDomains = ['@gmail.com', '@hotmail.com', '@yahoo.es'];
        const domain = value.substring(value.lastIndexOf('@'));
        if (allowedDomains.includes(domain)) {
          return true;
        } else {
          throw new Error('Email must be from @gmail.com, @hotmail.com, or @yahoo.es');
        }
      }),
    body('card_number').isNumeric().isLength({ min: 13, max: 16 }),
    body('cvv').isNumeric().isLength({ min: 3, max: 4 }).isIn(['123', '4532']),
    body('expiration_month').isString().isLength({ min: 1, max: 2 }).isInt({ min: 1, max: 12 }),
    body('expiration_year')
      .isString()
      .isLength({ min: 4 })
      .isInt({ min: new Date().getFullYear(), max: new Date().getFullYear() + 5 }),
  ],
  CardController.createCardToken
);

// Ruta para consultar un registro por token
router.get('/card/:token', CardController.getCardByToken);

export default router;
