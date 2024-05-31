// transaction.model.ts

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITransaction extends Document {
  user: Schema.Types.ObjectId;
  type: 'deposit' | 'withdrawal';
  amount: number;
  date: Date;
  balanceAfter: number;
}

const TransactionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['deposit', 'withdrawal'], required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  balanceAfter: { type: Number, required: true },
});

let TransactionModel: Model<ITransaction>;

if (mongoose.models.Transaction) {
  TransactionModel = mongoose.model<ITransaction>('Transaction');
} else {
  TransactionModel = mongoose.model<ITransaction>('Transaction', TransactionSchema);
}

export default TransactionModel;
