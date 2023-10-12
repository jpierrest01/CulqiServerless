"use strict";
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
const cardModel_1 = __importDefault(require("../models/cardModel"));
const createCardToken = (email, card_number, cvv, expiration_month, expiration_year, token) => __awaiter(void 0, void 0, void 0, function* () {
    // Guarda la tarjeta en la base de datos
    const card = new cardModel_1.default({
        email,
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        token,
    });
    yield card.save();
    // Retorna el token generado
    return 'token-generado';
});
exports.default = {
    createCardToken,
};
