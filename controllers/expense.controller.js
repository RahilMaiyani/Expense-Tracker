import Expense from "../models/expense.model.js";

export const addExpense = async (req, res) => {
    try{
        const { name, amount, description, paymentMethod, category, date } = req.body;
        if(!name || !amount || !date){
            return res.status(400).json({ message: "name, amount and date are required" });
        }
        if (amount < 0) {
            return res.status(400).json({
                success: false,
                message: "Amount must be positive",
            });
        }

         const expense = await Expense.create({
            user: req.user._id, // 🔥 comes from protect middleware
            name: name.trim(),
            amount,
            description: description?.trim() || "",
            paymentMethod: paymentMethod || "other",
            category: category?.trim() || "Other",
            date: new Date(date),
        });

        return res.status(201).json({
        success: true,
        message: "Expense added successfully",
        data: expense,
        });
    } 
    catch (error) {
        console.error("Add Expense Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while adding expense",
        });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
        return res.status(200).json({
            success: true,
            data: expenses,
        });
    } catch (error) {
        console.error("Get Expenses Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while fetching expenses",
        });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const expense = await Expense.findOneAndDelete({ _id: expenseId, user: req.user._id });
        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found or not authorized to delete",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        });
    } catch (error) {
        console.error("Delete Expense Error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error while deleting expense",
        });
    }
};    

export const getExpense = async (req, res) => {
  const exp = await Expense.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  res.json({ data: exp });
};

export const updateExpense = async (req, res) => {
  const updated = await Expense.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );

  res.json({ data: updated });
};