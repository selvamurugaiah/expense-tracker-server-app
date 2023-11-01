const express = require('express');
const IncomeSchema = require('../../model/Income');
const { addIncome, getIncomes, deleteIncomes, income, updateIncome } = require('../../contollers/income/incomeController');
const { authorizeUser } = require('../../middleware/auth');
const incomeRoute = express.Router()


// Route to get a list of income, add and delete income

  
  // Route to get a specific user by ID


  incomeRoute.post('/add-income',authorizeUser, addIncome)
  incomeRoute.get('/get-incomes',authorizeUser,getIncomes)
  incomeRoute.get('/:id',authorizeUser, income);
  incomeRoute.put('/:id', authorizeUser, updateIncome);
  incomeRoute.delete('/delete-income/:id',authorizeUser ,deleteIncomes)


  module.exports = incomeRoute