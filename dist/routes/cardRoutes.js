"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/cardRoutes.ts
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const cardController_1 = __importDefault(require("../controllers/cardController"));
const router = express_1.default.Router();
router.post('/create-token', [
    (0, express_validator_1.body)('email')
        .isEmail()
        .custom(value => {
        // Check if the email address contains one of the allowed domains
        const allowedDomains = ['@gmail.com', '@hotmail.com', '@yahoo.es'];
        const domain = value.substring(value.lastIndexOf('@'));
        if (allowedDomains.includes(domain)) {
            return true;
        }
        else {
            throw new Error('Email must be from @gmail.com, @hotmail.com, or @yahoo.es');
        }
    }),
    (0, express_validator_1.body)('card_number').isNumeric().isLength({ min: 13, max: 16 }),
    (0, express_validator_1.body)('cvv').isNumeric().isLength({ min: 3, max: 4 }).isIn(['123', '4532']),
    (0, express_validator_1.body)('expiration_month').isString().isLength({ min: 1, max: 2 }).isInt({ min: 1, max: 12 }),
    (0, express_validator_1.body)('expiration_year')
        .isString()
        .isLength({ min: 4 })
        .isInt({ min: new Date().getFullYear(), max: new Date().getFullYear() + 5 }),
], cardController_1.default.createCardToken);
// Ruta para consultar un registro por token
router.get('/card/:token', cardController_1.default.getCardByToken);
exports.default = router;
