import express from 'express';
import Expense from '../models/Expense.js';
const router= express.Router();

router.post('/',async(req,res)=>{
    try{
        const{amount,category,date}=req.body;
        const newExpense= new Expense({amount,category,date});
        const savedExpense=await newExpense.save();
        res.status(201).json(savedExpense);
    } catch(err){
        res.status(500).json({message:'Error saving expense',error:err});
    }
});

export default router;