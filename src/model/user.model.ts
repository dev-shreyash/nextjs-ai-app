import mongoose, { Schema, Document, Model, Types } from 'mongoose';

// BankDetails Interface
export interface BankDetails extends Document {
  name: string;
  accountNumber: string;
  ifscCode: string;
  createdAt: Date;
  user: Types.ObjectId; // Reference to User model
}

// BankDetails Schema
const BankDetailsSchema: Schema<BankDetails> = new Schema({
  name: { type: String, required: true, trim: true },
  accountNumber: { type: String, required: true, trim: true, minlength: 10 },
  ifscCode: { type: String, required: true, trim: true, length: 11 },
  createdAt: { type: Date, required: true, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User model
});

export const BankDetailsModel: Model<BankDetails> = mongoose.models.BankDetails || mongoose.model<BankDetails>('BankDetails', BankDetailsSchema);


// Message Interface
export interface Message extends Document {
  content: string;
  createdAt: Date;
  amount?: number;
}

// Message Schema
const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  amount: { type: Number, required: false },
});

// User Interface
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifiedCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: Types.DocumentArray<Message>; // Array of Message subdocuments
  bankDetails: Types.ObjectId | BankDetails; // Reference to a single BankDetails
  balance: number;
  createdAt: Date;
}

// User Schema
const UserSchema: Schema<User> = new Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please use a valid email'],
  },
  password: { type: String, required: true },
  verifyCode: { type: String, required: true },
  verifiedCodeExpiry: { type: Date, required: true },
  isVerified: { type: Boolean, required: true, default: false },
  isAcceptingMessage: { type: Boolean, required: true, default: true },
  messages: [MessageSchema],
  bankDetails: { type: Schema.Types.ObjectId, ref: 'BankDetails' }, // Reference to a single BankDetails
  balance: { type: Number, default: 0 }, // Initial balance is 0
  createdAt: { type: Date, required: true, default: Date.now },
});

const UserModel: Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
