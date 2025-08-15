import express from 'express';
import Expense from '../models/Expense.js';
const router= express.Router();

router.post('/',async(req,res)=>{
    try{
        const{amount,category,date}=req.body;
        const newExpense= new Expense({amount,category,date});
        const savedExpense=await newExpense.save();
        console.log('Saved expense:', savedExpense);
        res.status(201).json(savedExpense);
    } catch(err){
        console.error('Error saving expense:', err);
        res.status(500).json({ message: 'Error saving expense', error: err.message || err.toString() });
    }
});
router.get('/',async(req,res)=>{
    try{
        const expenses= await Expense.find();
        res.status(200).json(expenses);
    }
    catch(err){
        console.error('error fetching expenses:',err);
        res.status(500).json({message:'error fetching expenses',error:err.message||err.toString()});
    }
});
router.patch('/',async(req,res)=>{
    
})

export default router;