import { Router} from "express";
import Expense from "../models/expense.model.js";
import { protect } from "../controllers/user.controller.js";
import { addExpense, getExpenses, deleteExpense, getExpense, updateExpense  } from "../controllers/expense.controller.js";
const expenseRouter = Router();

expenseRouter.post('/add', protect, addExpense);
expenseRouter.get('/all', protect, getExpenses);
expenseRouter.delete('/delete/:id', protect, deleteExpense);
expenseRouter.get('/:id', protect, getExpense);
expenseRouter.put('/update/:id', protect, updateExpense);

export default expenseRouter;