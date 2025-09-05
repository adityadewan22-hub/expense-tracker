import type { Expense } from "../ExpenseList";

export function groupByCategory(expenses:Expense[]){
    const grouped=new Map<string,number>();
    expenses.forEach(exp=>{
        grouped.set(exp.category,(grouped.get(exp.category)||0)+exp.amount)
    });
    return grouped;
}
export function groupByMonth(expenses: Expense[]) {
  const grouped = new Map<string, number>();
  expenses.forEach(exp => {
    const month = new Date(exp.date).toLocaleString("default", { month: "short", year: "numeric" });
    grouped.set(month, (grouped.get(month) || 0) + exp.amount);
  });
  return grouped; 
}

export function calculateBalance(expenses:Expense[]){
  return expenses.reduce((sum,exp)=>sum +exp.amount,0);
}