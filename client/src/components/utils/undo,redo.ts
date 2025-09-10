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

export function undo(expenses:Expense[]):Expense[]{
    if(undostack.length===0){
        return expenses;
    }
    const action =undostack.pop();
    if(!action){
        return expenses;
    }
    redostack.push(action);
    switch(action.type){
        case "add":
            return expenses.filter(e=>e._id!==action.expense._id);
        case "delete":
            return[...expenses,action.expense];
        case "edit":
            return expenses.map(e=>
                e._id===action.expense._id?action.prev:e
            );
        default:
            return expenses;
    }
}

export function redo(expenses: Expense[]): Expense[] {
  if (redostack.length === 0) return expenses;

  const action = redostack.pop()!;
  undostack.push(action);

  switch (action.type) {
    case "add":
      return [...expenses, action.expense];
    case "delete":
      return expenses.filter(e => e._id !== action.expense._id);
    case "edit":
      return expenses.map(e =>
        e._id === action.expense._id ? action.expense : e
      );
    default:
      return expenses;
  }
}