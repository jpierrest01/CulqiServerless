import CardModel from '../models/cardModel';

const createCardToken = async (email: string, card_number: string, cvv: string, expiration_month: string, expiration_year: string, token: string ) => {


  // Guarda la tarjeta en la base de datos
  const card = new CardModel({
    email,
    card_number,
    cvv,
    expiration_month,
    expiration_year,
    token,
  });

  await card.save();

  // Retorna el token generado
  return 'token-generado';
};

export default {
  createCardToken,
};
