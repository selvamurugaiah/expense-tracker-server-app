const IncomeSchema = require("../../model/Income");

const addIncome = async(req,res)=>{
    const{title,amount,category,description,date,user} = req.body
    const income = await IncomeSchema({
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
     if(amount<=0 || !amount=== 'number'){
         return res.status(400).json({
             message:'Amount must be a positive number !'
         })
     }
     await income.save()
     res.status(200).json({
         message:'Income Added',
         income:income
     })
     
    } catch (error) {
     res.status(500).json({message:'Server Error',error: error})
    }
    console.log(income)
 }
 
 const getIncomes = async(req,res)=>{
  
   const {page} = req.query;
     try {
         const incomes = await IncomeSchema.paginate({},{limit:10, page:Number(page),
        populate:"user"})
         res.status(200).json(incomes)
     } catch (error) {
         res.status(500).json({message:'Server Error', error: error})
     }
 }


  const income = async (req, res) => {
    let { id } = req.params;
    id = id.trim()
    try {
      const income = await IncomeSchema.findById(id);
      if (!income) {
        return res.status(404).send({ message: "Income not found" });
      }
      
      return res.status(200).send(income);
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Something went wrong" });
    }
  };
 
 const deleteIncomes = async(req,res)=>{
   const {id} =req.params;
   console.log(req.params)
   await IncomeSchema.findByIdAndDelete(id)
   .then((income)=>{
     res.status(200).json({message:'Income Deleted'})
   })
   .catch((err)=>{
     res.status(500).json({message:'Server Error',err})
   })
 }

 const updateIncome = async(req,res)=>{
  const {id} = req?.params
  const{title,amount,category,description,date} = req.body
  const income = await IncomeSchema.findByIdAndUpdate(id,{
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
   if(amount<=0 || !amount=== 'number'){
       return res.status(400).json({
           message:'Amount must be a positive number !'
       })
   }
   await income.save()
   res.status(200).json({
       message:'Income Updated successfully',
       income:income
   })
   
  } catch (error) {
   res.status(500).json({message:'Server Error',error: error})
  }
  console.log(income)
}

 module.exports = {
    addIncome,
    getIncomes,
    deleteIncomes,
    income,
    updateIncome
  
}