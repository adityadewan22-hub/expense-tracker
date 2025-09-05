import type { Expense } from "../ExpenseList";

interface ExpenseFilter{
    month?:string;
    category?:string;
    minAmount?: number;
    maxAmount?: number;
}

export function filterExpenses(
    expenses: Expense[],
    filters:ExpenseFilter
):Expense[]{
    return expenses.filter(exp=>{
        const date= new Date(exp.date);
        const month=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;

        if (filters.month && filters.month !== month) return false;
        if (filters.category && filters.category !== exp.category) return false;
        if (filters.minAmount !== undefined && exp.amount < filters.minAmount) return false;
        if (filters.maxAmount !== undefined && exp.amount > filters.maxAmount) return false;

        return true;
    })
}