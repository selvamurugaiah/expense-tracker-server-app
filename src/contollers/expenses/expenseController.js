const ExpenseSchema = require('../../model/Expenes')

const addExpense = async(req,res)=>{
    const{title,amount,category,description,date,user} = req.body
    const expense = await ExpenseSchema({
     title,
     amount,
     category,
     description,
     date,
     user
    })
    try {
     //validations
     if(!title || !category ||!description || !date ){
         return res.status(400).json({
             message:'All fields are required !' 
             
         })
     }
     if(amount<=0 ||typeof amount !== 'number'){
         return res.status(400).json({
             message:'Amount must be a positive number !'
         })
     }
     await expense.save()
     res.status(200).json({
         message:'Expense Added',
         expense:expense
     })
     
    } catch (error) {
     res.status(500).json({message:'Server Error',error: error})
    }
    console.log(expense)
 }
 
 const getExpense = async(req,res)=>{
    const {page} = req.query;
     try {
         const expenses = await ExpenseSchema.paginate({},{limit:10, page:Number(page),
        populate:"user"})
         res.status(200).json(expenses)
     } catch (error) {
         res.status(500).json({message:'Server Error', error: error})
     }
 }


  const expense = async (req, res) => {
    let { id } = req.params;
    id = id.trim()
    try {
      const expense = await ExpenseSchema.findById(id);
      if (!expense) {
        return res.status(404).send({ message: "Expense not found" });
      }
      
      return res.status(200).send(expense);
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Something went wrong" });
    }
  };
 
 const deleteExpense = async(req,res)=>{
   const {id} =req.params;
   console.log(req.params)
   await ExpenseSchema.findByIdAndDelete(id)
   .then((expense)=>{
     res.status(200).json({message:'Expense Deleted'})
   })
   .catch((err)=>{
     res.status(500).json({message:'Server Error',err})
   })
 }

 const updateExpense = async(req,res)=>{
  const {id} = req?.params
  const{title,amount,category,description,date} = req.body
  const expense = await ExpenseSchema.findByIdAndUpdate(id,{
   title,
   amount,
   category,
   description,
   date,
  },
  {new:true}
  )
  try {
   //validations
   if(!title || !category ||!description || !date ){
       return res.status(400).json({
           message:'All fields are required !' 
           
       })
   }
   if(amount<=0 ||typeof amount !== 'number' ){
       return res.status(400).json({
           message:'Amount must be a positive number !'
       })
   }
   await expense.save()
   res.status(200).json({
       message:'Expense Updated successfully',
       expense:expense
   })
   
  } catch (error) {
   res.status(500).json({message:'Server Error',error: error})
  }
  console.log(expense)
}

 module.exports = {
    addExpense,
    getExpense,
    deleteExpense,
    expense,
    updateExpense
  
}