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
    try{
        const{_id,...updateData}=req.body;
        if(!_id){
            return res.status(400).json({message:"ID is required"});
        }
        const expenseChange=await Expense.findByIdAndUpdate(_id, updateData, {new:true});
        if(!expenseChange){
            return res.status(404).json({message:"expense not found"});
        }
        res.json(expenseChange);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
    
});
router.delete('/',async(req,res)=>{
    try{
        const{_id}=req.params;
        if(!_id){
            return res.status(400).json({message:"ID is required"});
        }
        const expenseRemove= await Expense.findByIdAndDelete(_id);
        if(!expenseRemove){
            return res.status(404).json({message:"expense not found"});
        }
        res.status(200).json({message:"expense deleted successfully", expense:expenseRemove});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
})

export default router;