import type { Expense } from "../ExpenseList";

export function validateExpense(expenses:Expense):string| null{
    if(!expenses.category||expenses.category.trim()===""){
        return "Category cannot be blank";
    }
    if(expenses.amount<=0){
        return "amount must be greater than 0";
    }
    return null;
}