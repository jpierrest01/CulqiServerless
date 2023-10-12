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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const MONGODB_URI = 'mongodb://localhost/mi-api-mongodb'; // Reemplaza con tu URL de conexión.
        /*await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });*/
        console.log('Conexión exitosa a la base de datos MongoDB');
    }
    catch (error) {
        console.error('Error al conectar a la base de datos: ' + error);
    }
});
exports.connectDB = connectDB;
