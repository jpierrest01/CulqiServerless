import express  from "express";
import bodyParser from 'body-parser';
import cardRoutes from './routes/cardRoutes';
import { connectDB } from './config/database'; // Importa la función de conexión a la base de datos

class Application {
    app: express.Application;

    constructor(){
        this.app = express();
    }
    start() {
        const PORT = process.env.PORT || 3000;
        this.app.use(bodyParser.json());
        this.app.use('/api', cardRoutes);
            
        connectDB();

        this.app.listen(PORT,() => {
            console.log('Server running')
        });
    }
}

export default Application;