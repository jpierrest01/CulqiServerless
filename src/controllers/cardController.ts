// src/controllers/cardController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import CardService from '../services/cardService';
import CardModel, { Card } from '../models/cardModel';
import * as crypto from 'crypto';

const createCardToken = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  
  const { email, card_number, cvv, expiration_month, expiration_year} = req.body;

  try {
    const token = generateToken();
    const validCard = validateCardNumber(card_number);
    let new_token;
    
    //if (validCard) {
      new_token = await CardService.createCardToken(email, card_number, cvv, expiration_month, expiration_year, token);  
    //}else{
      //res.status(400).json({ msg:'Verifique el numero de tarjeta' });
    //}    
    res.status(201).json({ new_token ,token: token});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear el token' });
  }
};

const getCardByToken = async (req: Request, res: Response) => {
  const { token } = req.params;

  try {
    // Busca la tarjeta en la base de datos por el token
    const card: Card | null = await CardModel.findOne({ token: token }, { cvv: 0 }).exec();

    if (!card) {
      return res.status(404).json({ error: 'Tarjeta no encontrada o expirada' });
    }

    return res.status(200).json(card);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error al consultar la tarjeta' });
  }
};

function generateToken(): string {
  const token = crypto.randomBytes(8).toString('hex');
  return token;
}

function validateCardNumber(cardNumber: string): boolean {
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

export default {
  createCardToken,
  getCardByToken
};
