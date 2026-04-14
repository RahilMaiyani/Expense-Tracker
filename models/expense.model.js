// models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    paymentMethod: {
      type: String,
      enum: ['cash', 'upi', 'card', 'wallet', 'netbanking', 'other'],
      default: 'other',
    },
    category: {
      type: String,
      default: 'Other',
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

const Expense = mongoose.model('Expense', expenseSchema);

export default Expense;
