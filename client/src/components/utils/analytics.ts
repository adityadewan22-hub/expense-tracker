import type { Expense } from "../ExpenseList";
import { groupByCategory,groupByMonth } from "./grouping";

export function analytics(expenses:Expense[]){
    if(expenses.length===0){
        return {};
    }
    const byCategory=groupByCategory(expenses);
    const byMonth=groupByMonth(expenses);

    const biggestExpense=expenses.reduce((max,e)=>
    e.amount>max.amount?e:max);

    let topCategory = { category: "", amount: 0 };
    byCategory.forEach((amt, cat) => {
    if (amt > topCategory.amount) topCategory = { category: cat, amount: amt };
    });

    const avgMonthly =
    Array.from(byMonth.values()).reduce((a, b) => a + b, 0) / byMonth.size;

    return { biggestExpense, topCategory, averageMonthly: avgMonthly };
}