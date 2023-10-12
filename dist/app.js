"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cardRoutes_1 = __importDefault(require("./routes/cardRoutes"));
const database_1 = require("./config/database"); // Importa la función de conexión a la base de datos
class Application {
    constructor() {
        this.app = (0, express_1.default)();
    }
    start() {
        const PORT = process.env.PORT || 3000;
        this.app.use(body_parser_1.default.json());
        this.app.use('/api', cardRoutes_1.default);
        (0, database_1.connectDB)();
        this.app.listen(PORT, () => {
            console.log('Server running');
        });
    }
}
exports.default = Application;
