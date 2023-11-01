const express = require('express');
const dbConnect = require('./config/dbConnect');
const userRoute = require('./routes/users/usersRoute');
const incomeRoute = require('./routes/income/incomeRoute');
const expenseRoute = require('./routes/expenses/expenseRoute');




const app = express();
app.use(express.json())

dbConnect()

//routes
 
app.use("/", userRoute);

//income route

app.use('/income',incomeRoute)

//Expense Route
app.use('/expense',expenseRoute)


module.exports = app;