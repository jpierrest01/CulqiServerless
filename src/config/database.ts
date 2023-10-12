import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const MONGODB_URI = 'mongodb+srv://jpierrest01:H0OExXEpoeP5xlqJ@cluster0.hgrkns4.mongodb.net/CulqiDB?retryWrites=true&w=majority'; // Reemplaza con tu URL de conexión.
    await mongoose.connect(MONGODB_URI);
    console.log('Conexión exitosa a la base de datos MongoDB');
  } catch (error) {
    console.error('Error al conectar a la base de datos: ' + error);
  }
}



