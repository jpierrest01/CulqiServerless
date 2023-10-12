"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const cardService_1 = __importDefault(require("../services/cardService"));
const cardModel_1 = __importDefault(require("../models/cardModel"));
const crypto = __importStar(require("crypto"));
const createCardToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, card_number, cvv, expiration_month, expiration_year } = req.body;
    try {
        const token = generateToken();
        const validCard = validateCardNumber(card_number);
        let new_token;
        //if (validCard) {
        new_token = yield cardService_1.default.createCardToken(email, card_number, cvv, expiration_month, expiration_year, token);
        //}else{
        //res.status(400).json({ msg:'Verifique el numero de tarjeta' });
        //}    
        res.status(201).json({ new_token, token: token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el token' });
    }
});
const getCardByToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    try {
        // Busca la tarjeta en la base de datos por el token
        const card = yield cardModel_1.default.findOne({ token: token }, { cvv: 0 }).exec();
        if (!card) {
            return res.status(404).json({ error: 'Tarjeta no encontrada o expirada' });
        }
        return res.status(200).json(card);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error al consultar la tarjeta' });
    }
});
function generateToken() {
    const token = crypto.randomBytes(8).toString('hex');
    return token;
}
function validateCardNumber(cardNumber) {
    // Limpiar espacios y caracteres no numéricos
    cardNumber = cardNumber.replace(/\D/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 16) {
        return false; // El número de tarjeta no tiene la longitud válida
    }
    // Convertir el número de tarjeta en un array de dígitos
    const digits = cardNumber.split('').map(Number);
    let sum = 0;
    let double = false;
    // Aplicar el algoritmo de Luhn de derecha a izquierda
    for (let i = digits.length - 1; i >= 0; i--) {
        let digit = digits[i];
        if (double) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        double = !double;
    }
    // La tarjeta es válida si la suma de verificación es un múltiplo de 10
    return sum % 10 === 0;
}
exports.default = {
    createCardToken,
    getCardByToken
};
