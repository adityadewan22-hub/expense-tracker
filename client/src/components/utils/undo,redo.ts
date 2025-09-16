import  { addExpense, deleteExpense, updateExpense } from "../../api";
import type { Expense } from "../ExpenseList";

type Action=
|{type:"add";expense:Expense}
|{type:"delete";expense:Expense}
|{type:"edit";expense:Expense;prev:Expense}

let undostack:Action[]=[];
let redostack:Action[]=[];

export function recordAction(action:Action){
    undostack.push(action);
    redostack=[];
}

export async function undo(expenses:Expense[]):Promise<Expense[]>{
    if(undostack.length===0){
        return expenses;
    }
    const action =undostack.pop();
    if(!action){
        return expenses;
    }
    redostack.push(action);
    try{
    switch(action.type){
        case "add":
          await deleteExpense(action.expense._id);
            return expenses.filter(e=>e._id!==action.expense._id);
        case "delete":
          const addedExpense=await addExpense(action.expense); 
            return[...expenses,addedExpense];
        case "edit":
          const restoreExpense=await updateExpense(action.expense._id,action.prev);
            return expenses.map(e=>
                e._id===restoreExpense._id?restoreExpense:e
            );
        default:
            return expenses;
    }
  }
  catch(error){
    console.error("failed to sync with backend",error);
    undostack.push(action);
    redostack.pop();
    return expenses;
  }
}

export async function redo(expenses: Expense[]): Promise<Expense[]> {
  if (redostack.length === 0) return expenses;

  const action = redostack.pop()!;
  undostack.push(action);

  switch (action.type) {
    case "add":
      const addedExpense=await addExpense(action.expense);
      return [...expenses, addedExpense];
    case "delete":
      await deleteExpense(action.expense._id);
      return expenses.filter(e => e._id !== action.expense._id);
    case "edit":
      const updatedExpense= await updateExpense(action.expense._id,action.expense);
      return expenses.map(e =>
        e._id === updatedExpense._id ? updatedExpense : e
      );
    default:
      return expenses;
  }
}