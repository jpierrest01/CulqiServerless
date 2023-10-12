import mongoose, { Document, Schema } from 'mongoose';

export interface Card extends Document {
  email: string;
  card_number: string;
  cvv: string;
  expiration_year: string;
  expiration_month: string;
  token: string;
  createdAt: Date;
}

const cardSchema = new Schema<Card>({
  email: { type: String, required: true },
  card_number: { type: String, required: true },
  cvv: { type: String, required: true },
  expiration_year: { type: String, required: true },
  expiration_month: { type: String, required: true },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '15m' },
});

export default mongoose.model<Card>('Card', cardSchema);
