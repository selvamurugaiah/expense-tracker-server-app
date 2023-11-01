const express = require('express');
const ExpenseSchema = require('../../model/Expenes')
const { addExpense, getExpense, deleteExpense, expense, updateExpense } = require('../../contollers/expenses/expenseController');
const { authorizeUser } = require('../../middleware/auth');
const expenseRoute = express.Router()


// Route to get a list of expense, add and delete expense

  
  // Route to get a specific user by ID


  expenseRoute.post('/add-expense',authorizeUser, addExpense);
  expenseRoute.get('/get-expense',authorizeUser ,getExpense)
  expenseRoute.get('/:id',authorizeUser ,expense);
  expenseRoute.put('/:id', authorizeUser,updateExpense);
  expenseRoute.delete('/delete-expense/:id',authorizeUser ,deleteExpense);

module.exports = expenseRoute